<?php

namespace Tests\Feature;

use App\Models\BrokerInquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Tests\TestCase;

class BrokerInquiryTest extends TestCase
{
    use LazilyRefreshDatabase;

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'full_name' => 'Marla Quint',
            'company' => 'Quint Field Services',
            'email' => 'marla@quintfield.test',
            'phone' => '307-555-0188',
            'topic' => 'request_valuation',
            'equipment_type' => 'CAT 3512 Generator',
            'message' => 'Two units sitting in the Powder River yard. What are they worth today?',
            'preferred_contact' => 'phone',
            'consent' => true,
        ], $overrides);
    }

    public function test_guest_inquiry_is_recorded_and_returns_to_the_form_section(): void
    {
        $usersBefore = User::count();

        $this->post('/sell-equipment/contact-broker', $this->payload())
            ->assertRedirect('/sell-equipment/contact-broker#talk-to-a-broker-form');

        $inquiry = BrokerInquiry::sole();

        $this->assertSame(BrokerInquiry::TYPE_BROKER_INQUIRY, $inquiry->type);
        $this->assertNull($inquiry->user_id);
        $this->assertSame('Marla Quint', $inquiry->full_name);
        $this->assertSame('Quint Field Services', $inquiry->company);
        $this->assertSame('marla@quintfield.test', $inquiry->email);
        $this->assertSame('307-555-0188', $inquiry->phone);
        $this->assertSame('request_valuation', $inquiry->topic);
        $this->assertSame('CAT 3512 Generator', $inquiry->equipment_type);
        $this->assertSame('phone', $inquiry->preferred_contact);
        $this->assertSame(BrokerInquiry::STATUS_NEW, $inquiry->status);
        $this->assertNotNull($inquiry->consented_at);

        $this->assertSame($usersBefore, User::count(), 'An inquiry must never create an account.');
    }

    public function test_consent_is_not_stored_as_a_column(): void
    {
        // `consent` is a checkbox the request requires but the table does not carry — the
        // timestamp is the record. Guards against it being mass-assigned back in.
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $this->assertArrayNotHasKey('consent', BrokerInquiry::sole()->getAttributes());
    }

    public function test_signed_in_visitor_is_linked_but_still_answered_from_the_form(): void
    {
        $seller = User::factory()->create([
            'user_type' => User::TYPE_SELLER,
            'email' => 'account@quintfield.test',
        ]);

        $this->actingAs($seller)->post('/sell-equipment/contact-broker', $this->payload());

        $inquiry = BrokerInquiry::sole();

        $this->assertSame($seller->id, $inquiry->user_id);
        // The typed address wins: someone may want the reply somewhere other than their login.
        $this->assertSame('marla@quintfield.test', $inquiry->email);
    }

    public function test_required_fields_are_enforced(): void
    {
        $this->post('/sell-equipment/contact-broker', [])
            ->assertSessionHasErrors(['full_name', 'email', 'phone', 'topic', 'message', 'preferred_contact', 'consent']);

        $this->assertSame(0, BrokerInquiry::count());
    }

    public function test_company_and_equipment_type_are_optional(): void
    {
        $payload = $this->payload();
        unset($payload['company'], $payload['equipment_type']);

        $this->post('/sell-equipment/contact-broker', $payload)
            ->assertSessionHasNoErrors();

        $this->assertNull(BrokerInquiry::sole()->company);
    }

    public function test_unknown_topic_and_contact_method_are_rejected(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload(['topic' => 'buy_a_rig']))
            ->assertSessionHasErrors('topic');

        $this->post('/sell-equipment/contact-broker', $this->payload(['preferred_contact' => 'carrier_pigeon']))
            ->assertSessionHasErrors('preferred_contact');
    }

    public function test_consent_must_be_accepted(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload(['consent' => false]))
            ->assertSessionHasErrors('consent');

        $this->assertSame(0, BrokerInquiry::count());
    }

    public function test_honeypot_submission_is_silently_discarded(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload(['website' => 'http://spam.test']))
            ->assertRedirect('/sell-equipment/contact-broker#talk-to-a-broker-form');

        $this->assertSame(0, BrokerInquiry::count(), 'A filled honeypot must not create a row.');
    }

    public function test_the_contact_page_renders_with_its_options_and_no_success_panel(): void
    {
        $this->get('/sell-equipment/contact-broker')
            ->assertOk()
            ->assertSee('I want to request a valuation')
            ->assertSee('"inquirySent":false', false);
    }

    public function test_the_success_flag_is_set_on_the_render_after_a_submission(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $this->get('/sell-equipment/contact-broker')
            ->assertOk()
            ->assertSee('"inquirySent":true', false);
    }

    public function test_the_leads_queue_is_broker_only(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $this->get('/broker/leads')->assertRedirect('/login');

        // EnsureUserType sends a wrong-type user back to their own portal rather than 403-ing,
        // the same as every other broker route (see AuthPortalTest).
        $seller = User::factory()->create(['user_type' => User::TYPE_SELLER]);
        $this->actingAs($seller)->get('/broker/leads')->assertRedirect('/seller/dashboard');
    }

    public function test_a_broker_sees_the_lead_with_its_contact_details(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->get('/broker/leads')
            ->assertOk()
            ->assertSee('Marla Quint')
            ->assertSee('marla@quintfield.test')
            ->assertSee('I want to request a valuation');
    }

    public function test_a_broker_can_move_a_lead_along(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $lead = BrokerInquiry::sole();
        $broker = User::factory()->create(['user_type' => User::TYPE_BROKER]);

        $this->actingAs($broker)
            ->patch("/broker/leads/{$lead->id}", ['status' => 'contacted'])
            ->assertSessionHasNoErrors();

        $this->assertSame('contacted', $lead->fresh()->status);

        $this->actingAs($broker)
            ->patch("/broker/leads/{$lead->id}", ['status' => 'archived'])
            ->assertSessionHasErrors('status');
    }

    public function test_a_seller_cannot_move_a_lead(): void
    {
        $this->post('/sell-equipment/contact-broker', $this->payload());

        $lead = BrokerInquiry::sole();
        $seller = User::factory()->create(['user_type' => User::TYPE_SELLER]);

        $this->actingAs($seller)
            ->patch("/broker/leads/{$lead->id}", ['status' => 'closed'])
            ->assertRedirect('/seller/dashboard');

        $this->assertSame(BrokerInquiry::STATUS_NEW, $lead->fresh()->status);
    }
}
