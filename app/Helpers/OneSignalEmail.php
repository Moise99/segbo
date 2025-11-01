<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

if (!function_exists('sendEmailViaOneSignal')) {
    /**
     * Envoie un email (ou plusieurs) via OneSignal Email API
     *
     * @param string|array $emails Email unique ou tableau d’emails
     * @param string $subject Sujet de l’email
     * @param string $bodyHtml Corps HTML du message
     * @param string|null $url Lien de redirection (optionnel)
     * @return bool
     */
    function sendEmailViaOneSignal(string|array $emails, string $subject, string $logo, $unsuscribe, ?string $url = null): bool
    {
        // Convertir en tableau si c’est une seule adresse
        $emailList = is_array($emails) ? $emails : [$emails];

        // Appel à l’API OneSignal
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . env('ONESIGNAL_REST_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://onesignal.com/api/v1/notifications', [
            'app_id' => env('ONESIGNAL_APP_ID'),
            'include_email_tokens' => $emailList,
            'email_subject' => $subject,
            'logo' => $logo,
            'email_from_name' => config('app.name'),
            'email_from_address' => 'noreply@' . parse_url(config('app.url'), PHP_URL_HOST),
            'email_reply_to_address' => 'support@' . parse_url(config('app.url'), PHP_URL_HOST),
            'url' => $url,
            'email_unsubscribe_url' => $unsuscribe,
            'email_click_tracking_enabled' => true,
        ]);

        // Vérification et logs
        if ($response->failed()) {
            Log::error('OneSignal Email API failed', [
                'emails' => $emailList,
                'error' => $response->body(),
            ]);
            return false;
        }

        Log::info('OneSignal Email sent', [
            'emails' => $emailList,
            'subject' => $subject,
        ]);

        return true;
    }
}
