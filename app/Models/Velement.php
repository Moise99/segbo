<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Velement extends Model
{
    use HasFactory;

    protected $fillable = [
        'element_id',
        'viewers',
    ];

    // Relation vers le User (optionnel mais recommandé)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
