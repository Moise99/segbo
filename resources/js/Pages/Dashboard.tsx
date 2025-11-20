import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    Eye,
    FileText,
    TrendingUp,
    Users,
} from 'lucide-react';

interface Props {
    auth: any;
    kpi: {
        articles: number;
        article_views: number;
        profile_views: number;
        subscribers: number;
    };
    top_articles: Array<{
        title: string;
        cover: string;
        viewers: number;
        cat_name: string;
        date: string;
    }>;
    categories_stats: Array<{
        cat_name: string;
        count_articles: number;
        total_views: number;
    }>;
    subscribers_growth: Array<{
        month: string;
        count: number;
    }>;
}

export default function StatsDashboard({
    auth,
    kpi,
    top_articles,
    categories_stats,
}: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Statistics
                </h2>
            }
        >
            <Head title="Statistics Dashboard" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* 1. KPI CARDS */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard
                            title="Total Articles"
                            value={kpi.articles}
                            icon={
                                <FileText className="h-6 w-6 text-blue-600" />
                            }
                            color="bg-blue-50 border-blue-100"
                        />
                        <KpiCard
                            title="Content Views"
                            value={kpi.article_views}
                            icon={
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            }
                            color="bg-purple-50 border-purple-100"
                        />
                        <KpiCard
                            title="Profile Visits"
                            value={kpi.profile_views}
                            icon={<Eye className="h-6 w-6 text-orange-600" />}
                            color="bg-orange-50 border-orange-100"
                        />
                        <KpiCard
                            title="Subscribers"
                            value={kpi.subscribers}
                            icon={<Users className="h-6 w-6 text-green-600" />}
                            color="bg-green-50 border-green-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* 2. TOP ARTICLES */}
                        <div className="overflow-hidden border border-gray-100 bg-white p-6 shadow-sm sm:rounded-xl lg:col-span-2">
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
                                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                                <img
                                                    src={article.cover}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-br-lg bg-black/50 text-xs font-bold text-white">
                                                    {idx + 1}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                                                    {article.title}
                                                </h4>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                        {article.cat_name}
                                                    </span>
                                                    <span>
                                                        • {article.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">
                                                    {article.viewers.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    views
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="py-8 text-center text-gray-500">
                                        No articles published yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 3. CATEGORY STATS (Simple Visual Bar) */}
                        <div className="overflow-hidden border border-gray-100 bg-white p-6 shadow-sm sm:rounded-xl">
                            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <Award className="h-5 w-5 text-blue-500" />
                                By Category
                            </h3>

                            <div className="space-y-6">
                                {categories_stats.map((cat, idx) => {
                                    // Calculate percentage strictly for visual width (avoid div by zero)
                                    const maxViews =
                                        Math.max(
                                            ...categories_stats.map(
                                                (c) => c.total_views,
                                            ),
                                        ) || 1;
                                    const percent = Math.round(
                                        (cat.total_views / maxViews) * 100,
                                    );

                                    return (
                                        <div key={idx}>
                                            <div className="mb-1 flex items-end justify-between">
                                                <span className="font-medium text-gray-700">
                                                    {cat.cat_name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {cat.total_views} views
                                                </span>
                                            </div>
                                            <div className="h-2.5 w-full rounded-full bg-gray-100">
                                                <div
                                                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                                                    style={{
                                                        width: `${percent}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="mt-1 text-right text-xs text-gray-400">
                                                {cat.count_articles} articles
                                            </div>
                                        </div>
                                    );
                                })}
                                {categories_stats.length === 0 && (
                                    <p className="text-center text-gray-500">
                                        No data available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Petit composant pour les cartes KPI
function KpiCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}) {
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
