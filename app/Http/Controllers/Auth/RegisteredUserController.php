<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Acdetail;
use Illuminate\Auth\Events\Registered;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
       // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required','string','lowercase','email','max:255', Rule::unique('users', 'email'),],
            'username' => ['required','string','lowercase','max:50', Rule::unique('users', 'username'),],
            'password' => ['required', 'confirmed', 'min:8'],
            'recaptcha_token' => ['required', 'string'],
        ]);


        if (config('services.recaptcha.enabled')) {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => config('services.recaptcha.secret'),
                'response' => $request->input('recaptcha_token'),
                'remoteip' => $request->ip(),
            ]);

            $result = $response->json();

            if (!($result['success'] ?? false)) {
                return back()->withErrors(['recaptcha_token' => 'ReCAPTCHA verification failed. Please, refresh the page and try again.'])->withInput();
            }

            if (($result['action'] ?? '') !== 'register') {
                return back()->withErrors(['recaptcha_token' => 'ReCAPTCHA action mismatch. Please, refresh the page and try again.'])->withInput();
            }

            if (($result['score'] ?? 0) < 0.5) {
                return back()->withErrors(['recaptcha_token' => 'ReCAPTCHA score too low. Please, refresh the page and try again.'])->withInput();
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        Acdetail::create([
            'user_id' => $user->id,
        ]);


        $user->notify(new CustomVerifyEmail());

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
