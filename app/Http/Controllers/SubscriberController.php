<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class SubscriberController extends Controller
{
    public function store(Request $request, $username)
    {

        $data = $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('username', $username)->firstOrFail();
        //dd($request->all(), $user->id);

        Subscriber::updateOrCreate(
            [
                'email' => $data['email'],
                'user_id' => $user->id
            ],
            [
                'is_active' => true
            ]
        );

        return back()->with('success', 'You have been successfully subscribed!');
    }


}

