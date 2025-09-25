<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Notification;

class CustomResetPassword extends ResetPasswordNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token) // <<< CORRIGÉ : Accepte le token
    {
        parent::__construct($token); // <<< CORRIGÉ : Appelle le constructeur de la classe parente
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
     public function toMail($notifiable): MailMessage
    {
        // 1. Déterminer le chemin vers la route de réinitialisation.
        // C'est la même logique que celle utilisée par Laravel pour générer l'URL.
        $url = url(route('password.reset', [
            'token' => $this->token, // $this->token est hérité de la classe parente.
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false)); // Utilisez false pour une URL relative si nécessaire, ou true pour absolue.

        return (new MailMessage)
            ->subject('Segbo password reset link') // Personnalisation du sujet
            ->line('You are receiving this email because we have received a password reset request for your Segbo account.')

                    // L'action utilise l'URL que nous venons de construire.
            ->action('Reset Password', $url)

                    // Afficher le temps d'expiration configuré dans config/auth.php
            ->line('This link will expire in ' . config('auth.passwords.'.config('auth.defaults.passwords').'.expire') . ' minutes.')

            ->line('If you did not request a reset, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
