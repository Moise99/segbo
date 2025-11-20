<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Cookie;

class SubscriberController extends Controller
{
    public function subscribe(Request $request, $username)
    {
        $data = $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('username', $username)->firstOrFail();
        $subscriber = Subscriber::where([
            ['email', $data['email']],
            ['user_id', $user->id]
        ])->first();
        if ($subscriber != null && $subscriber->is_active) {
            return redirect()->back()->with('success', 'You are already subscribed!');
        }

        Subscriber::updateOrCreate(
            [
                'email' => $data['email'],
                'user_id' => $user->id
            ],
            [
                'is_active' => true
            ]
        );

        // Paramètres : nom, valeur, minutes
        $cookie = Cookie::make(
            "subscriber_{$username}",
            $data['email'],
            60 * 24 * 365 // 1 an
        );



        return redirect()->back()->with('success', 'You have been successfully subscribed!')->withCookie($cookie);
    }

    public function unsubscribe(Request $request, $username)
    {
        $data = $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('username', $username)->firstOrFail();

        Subscriber::where([
            ['email', $data['email']],
            ['user_id', $user->id]
        ])->update(['is_active' => false]);

        $cookie = Cookie::forget("subscriber_{$username}");

        return redirect()->back()
            ->with('success', 'Unsubscribed.')
            ->withCookie($cookie);
    }
}
