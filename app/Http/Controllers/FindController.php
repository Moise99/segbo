<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
        //dd($reporters);
        return Inertia::render('Client/Reporters/List', [
            'reporters' => $reporters,
        ]);
    }

    public function findReporterDetails($username)
    {
        // Find the single reporter's basic details first.
        // Use firstOrFail() to automatically handle cases where the user doesn't exist.
        $reporterDetails = DB::table('users as u')
            ->join('acdetails as acd', 'u.id', '=', 'acd.user_id')
            ->select('u.id', 'u.name', 'u.username', 'acd.*')
            ->where('u.username', $username)
            ->firstOrFail();

        // Now, get the top 3 categories for this specific reporter.
        $topCategories = DB::table('elements as e')
            ->join('categories as c', 'e.categorie_id', '=', 'c.id')
            ->where('e.user_id', $reporterDetails->id)
            ->select('c.cat_name as name', DB::raw('COUNT(e.id) as pub_count'))
            ->groupBy('c.id', 'c.cat_name')
            ->orderByDesc('pub_count')
            ->take(3)
            ->get();

        // Combine the details and the categories into a single, clean object.
        $reporter = (object) [
            'name' => $reporterDetails->name,
            'username' => $reporterDetails->username,
            'present' => $reporterDetails->present,
            'photo' => $reporterDetails->photo,
            'linkedin' => $reporterDetails->linkedin,
            'instagram' => $reporterDetails->instagram,
            'facebook' => $reporterDetails->facebook,
            'x' => $reporterDetails->x,
            'website' => $reporterDetails->website,
            'categories' => $topCategories->toArray(), // Convert the collection to a simple array
        ];

        // articles
        $elements = DB::table('elements')
                    ->join('elementypes', 'elements.elementype_id', '=', 'elementypes.id')
                    ->join('users', 'elements.user_id', '=', 'users.id')
                    ->join('categories', 'elements.categorie_id', '=', 'categories.id')
                    ->where('elements.user_id', $reporterDetails->id)
                    ->select('elements.*', 'elementypes.et_name', 'cat_name')
                    ->orderBy('elements.id', 'desc')
                    ->get();


        return Inertia::render('Client/Reporters/Details', [
            'reporter' => $reporter,
            'elements' => $elements,
        ]);
    }

    public function findArticle()
    {
        $elements = DB::table('elements')
                    ->join('elementypes', 'elements.elementype_id', '=', 'elementypes.id')
                    ->join('users', 'elements.user_id', '=', 'users.id')
                    ->join('categories', 'elements.categorie_id', '=', 'categories.id')
                     ->join('acdetails', 'users.id', '=', 'acdetails.user_id')
                    ->select('elements.*', 'elementypes.et_name', 'cat_name', 'acdetails.photo', 'users.name', 'users.username')
                    ->orderBy('elements.id', 'desc')
                    ->get();
        return Inertia::render('Client/Articles/List', [
            'elements' => $elements,
        ]);
    }

    public function findArticleDetails($id)
    {
        //dd($id);
        $elements = DB::table('elements')
                    ->join('elementypes', 'elements.elementype_id', '=', 'elementypes.id')
                    ->join('users', 'elements.user_id', '=', 'users.id')
                    ->join('categories', 'elements.categorie_id', '=', 'categories.id')
                    ->join('acdetails', 'users.id', '=', 'acdetails.user_id')
                    ->where('elements.id', $id)
                    ->select('elements.*', 'elementypes.et_name', 'cat_name', 'acdetails.photo', 'users.name', 'users.username')
                    ->get();
        return Inertia::render('Client/Articles/Details', [
            'elements' => $elements,
        ]);
    }
}
