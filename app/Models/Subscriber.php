<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = [
        'email',
        'user_id',
        'onesignal_player_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
