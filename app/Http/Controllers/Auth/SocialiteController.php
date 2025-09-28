<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\Acdetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'username' => Str::slug($googleUser->getName()) . '_' . Str::random(5),
                    'email' => $googleUser->getEmail(),
                    'email_verified_at' => now(),
                    'password' => bcrypt(Str::random(16)),
                ]);

                $googleAvatar = $googleUser->avatar; //Google link
                if ($googleAvatar) {
                    $contents = file_get_contents($googleAvatar);
                    $imageInfo = getimagesizefromstring($contents);
                    $mime = $imageInfo['mime'];

                    $extension = match($mime) {
                        'image/jpeg' => 'jpg',
                        'image/png' => 'png',
                        default => 'jpg',
                    };

                    $filename = $user->id . '_' . time() . '_' . uniqid() . '.' . $extension;
                    $path = Storage::disk('noc_storage')->put('segbo/profile/' . $filename, $contents);
                } else {
                    $path = null;
                }


                Acdetail::create([
                    'user_id' => $user->id,
                    'photo' => $path,
                ]);
            }

            Auth::login($user);

            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['google' => 'Authentication failed.']);
        }
    }
}
