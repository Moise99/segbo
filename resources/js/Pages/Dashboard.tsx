import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types'; // Assure-toi que ce fichier existe (standard Breeze/Inertia)
import { Head } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    Calendar,
    Eye,
    FileText,
    TrendingUp,
    Users,
} from 'lucide-react';
import { ReactNode } from 'react';

// 1. Definition of Types
// -----------------------

// (KPI)
interface KPIData {
    articles: number;
    article_views: number;
    profile_views: number;
    subscribers: number;
}

// Top 5 article
interface TopArticle {
    title: string;
    cover: string;
    viewers: number;
    cat_name: string;
    date: string;
}

// stats by category
interface CategoryStat {
    cat_name: string;
    count_articles: number;
    total_views: number;
}

// Subscribers growth data
interface SubscriberGrowth {
    month: string;
    count: number;
}

//  Props
interface DashboardProps extends PageProps {
    kpi: KPIData;
    top_articles: TopArticle[];
    categories_stats: CategoryStat[];
    subscribers_growth: SubscriberGrowth[];
}

// 2. Composant Principal
// -----------------------
export default function StatsDashboard({
    kpi,
    top_articles,
    categories_stats,
    subscribers_growth,
}: DashboardProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* SECTION 1: CARTES KPI */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard
                            title="Total Publications"
                            value={kpi.articles}
                            icon={
                                <FileText className="h-6 w-6 text-blue-600" />
                            }
                            color="bg-blue-100 border-blue-900"
                        />
                        <KpiCard
                            title="Content Views"
                            value={kpi.article_views}
                            icon={
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            }
                            color="bg-purple-100 border-purple-900"
                        />
                        <KpiCard
                            title="Profile Visits"
                            value={kpi.profile_views}
                            icon={<Eye className="h-6 w-6 text-orange-600" />}
                            color="bg-orange-100 border-orange-900"
                        />
                        <KpiCard
                            title="Subscribers"
                            value={kpi.subscribers}
                            icon={<Users className="h-6 w-6 text-green-600" />}
                            color="bg-green-100 border-green-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* SECTION 2: TOP ARTICLES */}
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                    <TrendingUp className="h-5 w-5 text-orange-500" />
                                    Top Performing Articles
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {top_articles.length > 0 ? (
                                    top_articles.map((article, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
                                        >
                                            {/* Image with badge */}
                                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                                <img
                                                    src={article.cover}
                                                    alt={article.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-br-lg bg-black/50 text-xs font-bold text-white">
                                                    {idx + 1}
                                                </div>
                                            </div>

                                            {/* Infos Article */}
                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                                                    {article.title}
                                                </h4>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                        {article.cat_name}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {article.date}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Compteur de vues */}
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">
                                                    {Number(
                                                        article.viewers,
                                                    ).toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    vues
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-gray-500">
                                        No publication yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SECTION 3: STATS by CATEGORy (Graphic simple bar ) */}
                        <div className="space-y-6">
                            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
                                    <Award className="h-5 w-5 text-blue-500" />
                                    By Category
                                </h3>

                                <div className="space-y-5">
                                    {categories_stats.length > 0 ? (
                                        categories_stats.map((cat, idx) => {
                                            // Calcul du pourcentage pour la barre visuelle
                                            // On prend le max des vues pour étalonner les barres
                                            const maxViews =
                                                Math.max(
                                                    ...categories_stats.map(
                                                        (c) =>
                                                            Number(
                                                                c.total_views,
                                                            ),
                                                    ),
                                                ) || 1;
                                            const currentViews = Number(
                                                cat.total_views,
                                            );
                                            const percent = Math.round(
                                                (currentViews / maxViews) * 100,
                                            );

                                            return (
                                                <div key={idx}>
                                                    <div className="mb-1 flex items-end justify-between">
                                                        <span className="font-medium text-gray-700">
                                                            {cat.cat_name}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {currentViews.toLocaleString()}{' '}
                                                            views
                                                        </span>
                                                    </div>
                                                    {/* Progression Bar */}
                                                    <div className="h-2.5 w-full rounded-full bg-gray-100">
                                                        <div
                                                            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                                                            style={{
                                                                width: `${percent}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="mt-1 text-right text-xs text-gray-400">
                                                        {cat.count_articles}{' '}
                                                        article(s)
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center text-gray-500">
                                            No data available.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* SECTION 4 (Bonus) : grow resume */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Trending Subscriptions
                                </h3>
                                <div className="flex items-end gap-2">
                                    {subscribers_growth.map((grow, i) => (
                                        <div
                                            key={i}
                                            className="flex w-full flex-col items-center gap-1"
                                        >
                                            <div className="group relative h-24 w-full rounded-t bg-green-100">
                                                <div
                                                    className="absolute bottom-0 w-full rounded-t bg-green-400 transition-all hover:bg-green-500"
                                                    // On arbitre une hauteur max de 100% pour 50 abonnés (exemple)
                                                    style={{
                                                        height: `${Math.min((grow.count / 20) * 100, 100)}%`,
                                                    }}
                                                ></div>
                                                {/* Tooltip au survol */}
                                                <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                    {grow.count}
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-400">
                                                {grow.month.split('-')[1]}
                                            </span>
                                        </div>
                                    ))}
                                    {subscribers_growth.length === 0 && (
                                        <p className="w-full text-center text-xs text-gray-400">
                                            No new recent subscribers.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// 3. Composant Enfant Typé (Carte KPI)
// -----------------------

interface KpiCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
}

function KpiCard({ title, value, icon, color }: KpiCardProps) {
    return (
        <div
            className={`rounded-xl border p-6 shadow-sm ${color} transition-transform hover:-translate-y-1`}
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-white p-2 shadow-sm">{icon}</div>
            </div>
            <div>
                <p className="text-sm font-medium uppercase tracking-wider text-gray-600">
                    {title}
                </p>
                <h3 className="mt-1 text-3xl font-extrabold text-gray-900">
                    {value.toLocaleString()}
                </h3>
            </div>
        </div>
    );
}
