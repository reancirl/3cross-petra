@component('mail::message')
# Petra added a document to {{ $subjectTitle }}

**{{ $document->original_name }}** is now in your Petra portal.

@component('mail::button', ['url' => $documentsUrl])
View documents
@endcomponent

Any further documents added in the next few minutes will appear there too, without another email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
