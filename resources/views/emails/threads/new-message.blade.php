@component('mail::message')
# New message about {{ $subjectTitle }}

**{{ $senderName }}** wrote:

@component('mail::panel')
{{ $snippet }}
@endcomponent

@component('mail::button', ['url' => $threadUrl])
View conversation
@endcomponent

Reply in your Petra portal — this mailbox is not monitored.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
