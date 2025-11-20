<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        $userId = Auth::id();

        // 1. Global KPIs
        // -----------------------------------------
        $totalArticles = DB::table('elements')
            ->where('user_id', $userId)
            ->where('etate', 1)
            ->count();

        $totalArticleViews = DB::table('elements')
            ->join('velements', 'elements.id', '=', 'velements.element_id')
            ->where('elements.user_id', $userId)
            ->sum('velements.viewers');

        $profileViews = DB::table('vusers')
            ->where('user_id', $userId)
            ->value('viewers') ?? 0;

        $totalSubscribers = DB::table('subscribers')
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->count();

        // 2. Top 5 most view publications
        // -----------------------------------------
        $topArticles = DB::table('elements')
            ->join('velements', 'elements.id', '=', 'velements.element_id')
            ->join('categories', 'elements.categorie_id', '=', 'categories.id')
            ->where('elements.user_id', $userId)
            ->where('elements.etate', 1)
            ->select(
                'elements.title',
                'elements.cover',
                'velements.viewers',
                'categories.cat_name',
                'elements.created_at'
            )
            ->orderByDesc('velements.viewers')
            ->take(5)
            ->get()
            ->map(function($el) {
                $el->cover = $el->cover
                    ? Storage::disk('noc_storage')->url($el->cover)
                    : asset('images/logo.png');
                $el->date = Carbon::parse($el->created_at)->format('d M Y');
                return $el;
            });

        // 3. Statistics by Categories (graph data)
        // -----------------------------------------
        $statsByCategory = DB::table('elements')
            ->join('categories', 'elements.categorie_id', '=', 'categories.id')
            ->leftJoin('velements', 'elements.id', '=', 'velements.element_id')
            ->where('elements.user_id', $userId)
            ->where('elements.etate', 1)
            ->select(
                'categories.cat_name',
                DB::raw('COUNT(elements.id) as count_articles'),
                DB::raw('COALESCE(SUM(velements.viewers), 0) as total_views')
            )
            ->groupBy('categories.id', 'categories.cat_name')
            ->get();

        // 4. subscribtion evolution (last 6 mounths)
        $subscribersGrowth = DB::table('subscribers')
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Dashboard', [
            'kpi' => [
                'articles' => $totalArticles,
                'article_views' => $totalArticleViews,
                'profile_views' => $profileViews,
                'subscribers' => $totalSubscribers,
            ],
            'top_articles' => $topArticles,
            'categories_stats' => $statsByCategory,
            'subscribers_growth' => $subscribersGrowth
        ]);
    }
}
