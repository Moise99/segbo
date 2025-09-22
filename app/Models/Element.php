<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Element extends Model
{
    /** @use HasFactory */
    use HasFactory;
    protected $fillable = [
        'title',
        'link',
        'cover',
        'desc',
        'user_id',
        'elementype_id',
        'categorie_id',
    ];

    protected function casts() : array
    {
        return[
            'id' => 'integer',
            'title' => 'string',
            'link' => 'string',
            'desc' => 'string',
            'cover' => 'string',
            'user_id' => 'integer',
            'elementype_id' => 'integer',
            'categorie_id' => 'integer',
        ];
    }
}
