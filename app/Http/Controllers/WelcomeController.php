<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function topReporter()
    {
        $topReporters = DB::table('users as u')
            ->join('acdetails as acd', 'u.id', '=', 'acd.user_id')
            ->join('elements as e', 'u.id', '=', 'e.user_id')
            ->where('u.etatu', 1)
            ->select(
                'u.name',
                'u.username',
                'acd.photo',
                DB::raw('COUNT(e.id) as pub') 
            )
            ->groupBy('u.name', 'u.username', 'acd.photo')
            ->orderByDesc('pub')
            ->take(12)
            ->get();

        return Inertia::render('Welcome', [
            'topReporters' => $topReporters,
        ]);
    }
}
