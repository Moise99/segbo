<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acdetail extends Model
{
    protected $fillable = [
        'photo',
        'present',
        'linkedin',
        'facebook',
        'instagram',
        'x',
        'user_id',
    ];

    protected function casts() : array
    {
        return[
            'id' => 'integer',
            'photo' => 'string',
            'present' => 'string',
            'linkedin' => 'string',
            'facebook' => 'string',
            'user_id' => 'integer',
            'instagram' => 'string',
            'x' => 'string',
        ];
    }
}
