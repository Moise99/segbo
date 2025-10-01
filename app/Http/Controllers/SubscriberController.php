<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request, $userId)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'player_id' => 'nullable|string',
        ]);

        $subscriber = Subscriber::updateOrCreate(
            ['email' => $data['email'], 'user_id' => $userId],
            ['onesignal_player_id' => $data['player_id'] ?? null]
        );

        return response()->json(['ok' => true, 'subscriber' => $subscriber]);
    }
}

