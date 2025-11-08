<?php

namespace App\Services;

use Resend\Laravel\Facades\Resend;
use Exception;

class ResendService
{
    /**
     * Envoi d'email avec template Resend
     */
    public function sendWithTemplate($to, $templateData = [], $subject = null, $from = null)
    {
        try {
            $params = [
                'from' => $from ?? "segbonotif@segbon.com",
                'to' => is_array($to) ? $to : [$to],
                'subject' => $subject,
                'html' => view('emails.publication', $templateData)->render(),
            ];

            if (!empty($templateData)) {
                $params['template_data'] = $templateData;
            }

            $response = Resend::emails()->send($params);


            return [
                'success' => true,
                'response' => $response,
            ];
        } catch (Exception $e) {
            \Log::error('Resend API Error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Envoi groupé optimisé pour les notifications de publication
     */
    public function sendBulkPublicationNotifications($subscribers, $templateData)
    {
        $batchSize = 50;
        $results = [];
        $subscriberBatches = array_chunk($subscribers, $batchSize);

        foreach ($subscriberBatches as $batchIndex => $batch) {
            foreach ($batch as $subscriberEmail) {
                $result = $this->sendWithTemplate(
                    $subscriberEmail,
                    $templateData,
                    $templateData['subject'] ?? 'New Publication on Segbon'
                );

                $results[] = $result;

                if (count($batch) > 10) {
                    usleep(100000); // 100ms
                }
            }

            if ($batchIndex < count($subscriberBatches) - 1) {
                sleep(1);
            }
        }

        return $results;
    }
}
