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
    public function stats(Request $request)
    {
        $userId = Auth::id();

        // 1. Date filter management
        // -----------------------------------------
        $range = $request->input('range', '30d'); // default 30d

        $startDate = match ($range) {
            '30d' => Carbon::now()->subDays(30),
            '90d' => Carbon::now()->subDays(90),
            '6m'  => Carbon::now()->subMonths(6),
            '1y'  => Carbon::now()->subYear(),
            'all' => null, // no date limit
            default => Carbon::now()->subDays(30),
        };

        // Helper to apply date condition if exits
        $applyDateFilter = function ($query, $column = 'created_at') use ($startDate) {
            if ($startDate) {
                $query->where($column, '>=', $startDate);
            }
        };

        // 2. Global KPIs (filter by date)
        // -----------------------------------------

        // Total Articles publish in the period
        $totalArticles = DB::table('elements')
            ->where('user_id', $userId)
            ->where('etate', 1)
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->count();

        // Cumul of Article Views in the period
        $totalArticleViews = DB::table('elements')
            ->join('velements', 'elements.id', '=', 'velements.element_id')
            ->where('elements.user_id', $userId)
            ->when($startDate, fn($q) => $q->where('elements.created_at', '>=', $startDate))
            ->sum('velements.viewers');

        // Profil views (total, not period-specific)
        $profileViews = DB::table('vusers')
            ->where('user_id', $userId)
            ->value('viewers') ?? 0;

        // New subscribers in the period
        $totalSubscribers = DB::table('subscribers')
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
            ->count();

        // 3. Top 5 Publications
        // -----------------------------------------
        $topArticles = DB::table('elements')
            ->join('velements', 'elements.id', '=', 'velements.element_id')
            ->join('categories', 'elements.categorie_id', '=', 'categories.id')
            ->where('elements.user_id', $userId)
            ->where('elements.etate', 1)
            ->when($startDate, fn($q) => $q->where('elements.created_at', '>=', $startDate))
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
                    : asset('images/logo.png'); // default image
                $el->date = Carbon::parse($el->created_at)->format('d M Y');
                return $el;
            });

        // 4. Statistics by Categories
        // -----------------------------------------
        $statsByCategory = DB::table('elements')
            ->join('categories', 'elements.categorie_id', '=', 'categories.id')
            ->leftJoin('velements', 'elements.id', '=', 'velements.element_id')
            ->where('elements.user_id', $userId)
            ->where('elements.etate', 1)
            ->when($startDate, fn($q) => $q->where('elements.created_at', '>=', $startDate))
            ->select(
                'categories.cat_name',
                DB::raw('COUNT(elements.id) as count_articles'),
                DB::raw('COALESCE(SUM(velements.viewers), 0) as total_views')
            )
            ->groupBy('categories.id', 'categories.cat_name')
            ->get();

        // 5. Subscriber Evolution (Graphique)
        // -----------------------------------------
        $subscribersGrowth = DB::table('subscribers')
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->when($startDate, fn($q) => $q->where('created_at', '>=', $startDate))
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
                'article_views' => $totalArticleViews, // Cast in int
                'profile_views' => $profileViews,
                'subscribers' => $totalSubscribers,
            ],
            'top_articles' => $topArticles,
            'categories_stats' => $statsByCategory,
            'subscribers_growth' => $subscribersGrowth,
            'currentRange' => $range, // IMPORTANT: to keep the selected filter on frontend
        ]);
    }
}
