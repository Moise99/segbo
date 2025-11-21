import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    ArrowUpRight,
    BarChart3,
    Calendar,
    Eye,
    FileText,
    Users,
} from 'lucide-react';

// Composants UI (Shadcn)
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Recharts
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// --- TYPES ---
interface KPIData {
    articles: number;
    article_views: number;
    profile_views: number;
    subscribers: number;
}

interface TopArticle {
    title: string;
    cover: string;
    viewers: number;
    cat_name: string;
    date: string;
}

interface CategoryStat {
    cat_name: string;
    count_articles: number;
    total_views: number;
}

interface SubscriberGrowth {
    month: string;
    count: number;
}

interface DashboardProps extends PageProps {
    kpi: KPIData;
    top_articles: TopArticle[];
    categories_stats: CategoryStat[];
    subscribers_growth: SubscriberGrowth[];
    currentRange: string; // Reçu du Controller
}

export default function StatsDashboard({
    kpi,
    top_articles,
    categories_stats,
    subscribers_growth,
    currentRange,
}: DashboardProps) {
    // Number formatter
    const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);

    // filter handler
    const onRangeChange = (value: string) => {
        router.get(
            route('dashboard'),
            { range: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Dashboard Overview
                    </h2>

                    <div className="flex items-center space-x-2">
                        {/* Period selector */}
                        <Select
                            defaultValue={currentRange}
                            onValueChange={onRangeChange}
                        >
                            <SelectTrigger className="w-[180px] bg-white">
                                <Calendar className="mr-2 h-4 w-4 opacity-50" />
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30d">
                                    Last 30 Days
                                </SelectItem>
                                <SelectItem value="90d">
                                    Last 3 Months
                                </SelectItem>
                                <SelectItem value="6m">
                                    Last 6 Months
                                </SelectItem>
                                <SelectItem value="1y">Last Year</SelectItem>
                                <SelectItem value="all">All Time</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button> */}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50/50 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    {/* SECTION 1: KPI CARDS */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KpiCard
                            title="Total Publications"
                            value={kpi.articles}
                            icon={FileText}
                            subtext="published articles"
                        />
                        <KpiCard
                            title="Content Views"
                            value={kpi.article_views}
                            icon={BarChart3}
                            subtext="total impressions"
                        />
                        <KpiCard
                            title="Profile Visits"
                            value={kpi.profile_views}
                            icon={Eye}
                            subtext="Visitors"
                        />
                        <KpiCard
                            title="Subscribers"
                            value={kpi.subscribers}
                            icon={Users}
                            subtext="Followers"
                        />
                    </div>

                    {/* SECTION 2: GRAPHIQUES */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Growth Chart (4 colonnes) */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Subscriber Growth</CardTitle>
                                <CardDescription>
                                    Evolution over the selected period.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart data={subscribers_growth}>
                                            <defs>
                                                <linearGradient
                                                    id="colorCount"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="#2563eb"
                                                        stopOpacity={0.3}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="#2563eb"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="month"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(val) => {
                                                    // show only month part
                                                    const parts =
                                                        val.split('-');
                                                    return parts.length > 1
                                                        ? parts[1]
                                                        : val;
                                                }}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#f0f0f0"
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e5e7eb',
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#2563eb"
                                                fillOpacity={1}
                                                fill="url(#colorCount)"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories Chart (3 colonnes) */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Category Performance</CardTitle>
                                <CardDescription>
                                    Views distribution by category.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    {categories_stats.length > 0 ? (
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <BarChart
                                                layout="vertical"
                                                data={categories_stats}
                                                margin={{
                                                    left: 0,
                                                    right: 20,
                                                    top: 0,
                                                    bottom: 0,
                                                }}
                                            >
                                                <XAxis type="number" hide />
                                                <YAxis
                                                    dataKey="cat_name"
                                                    type="category"
                                                    width={100}
                                                    tick={{
                                                        fontSize: 12,
                                                        fill: '#6b7280',
                                                    }}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <Tooltip
                                                    cursor={{
                                                        fill: 'transparent',
                                                    }}
                                                    contentStyle={{
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="total_views"
                                                    fill="#0f172a"
                                                    radius={[0, 4, 4, 0]}
                                                    barSize={20}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                            No data for this period
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* SECTION 3: TOP ARTICLES TABLE */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Top Performing Articles</CardTitle>
                                <CardDescription>
                                    Most viewed content published in this
                                    period.
                                </CardDescription>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex"
                            >
                                View All{' '}
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {top_articles.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                #
                                            </TableHead>
                                            <TableHead>Article</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Views
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {top_articles.map((article, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium text-muted-foreground">
                                                    {idx + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                                            <img
                                                                src={
                                                                    article.cover
                                                                }
                                                                alt={
                                                                    article.title
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span
                                                            className="max-w-[150px] truncate font-medium sm:max-w-[300px]"
                                                            title={
                                                                article.title
                                                            }
                                                        >
                                                            {article.title}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className="rounded-sm bg-gray-100 font-normal text-gray-700 hover:bg-gray-200"
                                                    >
                                                        {article.cat_name}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                                                    {article.date}
                                                </TableCell>
                                                <TableCell className="text-right font-bold text-gray-900">
                                                    {fmt(article.viewers)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="py-12 text-center text-muted-foreground">
                                    No articles found for this period.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper Component  for KPI Cards
function KpiCard({
    title,
    value,
    icon: Icon,
    subtext,
}: {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    subtext: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                    {value.toLocaleString()}
                </div>
                <p className="mt-1 text-xs capitalize text-muted-foreground">
                    {subtext}
                </p>
            </CardContent>
        </Card>
    );
}
