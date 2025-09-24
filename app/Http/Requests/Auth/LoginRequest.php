<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'recaptcha_token' => ['required', 'string'],
        ];
    }

    public function withValidator($validator)
    {
        $renableCaptcha = config('services.recaptcha.enabled');

        if ($renableCaptcha === true) {
            $validator->after(function ($validator) {

                $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret'   => config('services.recaptcha.secret'),
                    'response' => $this->recaptcha_token,
                    'remoteip' => $this->ip(),
                ]);

                $result = $response->json();

                if (!($result['success'] ?? false)) {
                    $validator->errors()->add('recaptcha_token', 'La vérification reCAPTCHA a échoué : réponse invalide.');
                    return;
                }

                if (($result['action'] ?? '') !== 'login') {
                    $validator->errors()->add('recaptcha_token', 'La vérification reCAPTCHA a échoué : action incorrecte.');
                    return;
                }

                if (($result['score'] ?? 0) < 0.5) {
                    $validator->errors()->add('recaptcha_token', 'La vérification reCAPTCHA a échoué : score trop bas.');
                    return;
                }
            });
        }
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt(array_merge($this->only('email', 'password'), ['etatu' => 1]), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
