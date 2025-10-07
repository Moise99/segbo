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
        if ($subscriber->is_active) {
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

        Cookie::queue("subscriber_{$username}", $data['email'], 60 * 24 * 365);



        return redirect()->back()->with('success', 'You have been successfully subscribed!');
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

        Cookie::queue(Cookie::forget("subscriber_{$username}"));

        return redirect()->back()->with('success', 'You have been unsubscribed.');
    }

    // public function status(Request $request, $username)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //     ]);
    //     $email = $request->query('email');
    //     $user = User::where('username', $username)->firstOrFail();

    //     $subscriber = Subscriber::where('email', $email)
    //                             ->where('user_id', $user->id)
    //                             ->first();


    //     return response()->json([
    //         'isActive' => $subscriber ? $subscriber->is_active : false,
    //     ]);
    // }

}
