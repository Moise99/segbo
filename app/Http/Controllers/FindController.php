<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FindController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function findReporter()
    {
        $rawData = DB::table('users as u')
            ->join('acdetails as acd', 'u.id', '=', 'acd.user_id')
            ->join('elements as e', 'u.id', '=', 'e.user_id')
            ->join('categories as c', 'e.categorie_id', '=', 'c.id')
            ->select(
                'u.id as user_id',
                'u.name',
                'u.username',
                'acd.photo',
                'c.cat_name',
                DB::raw('COUNT(e.id) as publications_count')
            )
            ->groupBy('u.id', 'u.name', 'u.username', 'acd.photo', 'c.id', 'c.cat_name')
            ->orderBy('u.id')
            ->orderByDesc('publications_count')
            ->get();

// Regrouper par utilisateur et garder seulement le top 3
        $reporters = $rawData->groupBy('user_id')->map(function ($userCategories) {
            $user = $userCategories->first();

            return (object) [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'username' => $user->username,
                'photo' => $user->photo,
                'categories' => $userCategories->take(3)->map(function($cat) {
                    return [
                        'name' => $cat->cat_name,
                        'count' => $cat->publications_count
                    ];
                })->toArray()
            ];
        })->values();
        dd($reporters);
    }

    public function findArticle()
    {
        dd('yes');
    }
}
