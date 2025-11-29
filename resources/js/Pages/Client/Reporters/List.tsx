import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Award, Grid3x3, List, Search, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

// --- TYPES ---
type Category = {
    name: string;
    count: number;
};

type Reporter = {
    name: string;
    username: string;
    photo: string;
    categories: Category[];
    total_publi: number;
};

interface Props extends PageProps {
    reporters: Reporter[];
}

export default function Reporters() {
    const { reporters } = usePage<Props>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const itemsPerPage = 4;

    // --- LOGIC: FILTER & PAGINATION ---
    const filteredReporters = useMemo(() => {
        if (!searchTerm) return reporters;
        const lower = searchTerm.toLowerCase();
        return reporters.filter(
            (r) =>
                r.name.toLowerCase().includes(lower) ||
                r.username.toLowerCase().includes(lower) ||
                r.categories.some((c) => c.name.toLowerCase().includes(lower)),
        );
    }, [reporters, searchTerm]);

    const totalPages = Math.ceil(filteredReporters.length / itemsPerPage);
    const currentReporters = filteredReporters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    return (
        <GuestLayout>
            <Head title="Segbons" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
                {/* 1. HERO HEADER */}
                <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                        <Badge
                            variant="secondary"
                            className="mb-6 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
                        >
                            <Award className="mr-2 h-4 w-4" />
                            Our Segbons
                        </Badge>

                        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Meet Our Segbons
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-orange-100">
                            Discover talented storytellers and their areas of
                            expertise.
                        </p>
                    </div>
                </div>

                {/* 2. SEARCH BAR SECTION */}
                <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card className="rounded-3xl border-gray-100 shadow-2xl">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name, username, or expertise..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            handleSearch(e.target.value)
                                        }
                                        className="h-auto rounded-2xl border-2 border-gray-200 py-4 pl-12 pr-4 text-lg transition-colors focus-visible:border-orange-500 focus-visible:ring-0"
                                    />
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 p-1">
                                    <Button
                                        variant={
                                            viewMode === 'grid'
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className={`rounded-xl ${viewMode === 'grid' ? 'bg-orange-600 hover:bg-orange-700' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        <Grid3x3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            viewMode === 'list'
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className={`rounded-xl ${viewMode === 'list' ? 'bg-orange-600 hover:bg-orange-700' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between px-1 text-sm text-gray-500">
                                <span>
                                    Showing{' '}
                                    {currentReporters.length > 0
                                        ? (currentPage - 1) * itemsPerPage + 1
                                        : 0}
                                    -
                                    {Math.min(
                                        currentPage * itemsPerPage,
                                        filteredReporters.length,
                                    )}{' '}
                                    of {filteredReporters.length} journalists
                                </span>
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearch('')}
                                        className="text-orange-600 hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. REPORTERS GRID */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {currentReporters.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                // GRILLE EXACTE DEMANDÉE : lg:grid-cols-3
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {currentReporters.map((reporter, idx) => (
                                        <ReporterCard
                                            key={idx}
                                            reporter={reporter}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {currentReporters.map((reporter, idx) => (
                                        <ReporterListItem
                                            key={idx}
                                            reporter={reporter}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* 4. PAGINATION SHADCN */}
                            {totalPages > 1 && (
                                <div className="mt-16">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        setCurrentPage((p) =>
                                                            Math.max(1, p - 1),
                                                        )
                                                    }
                                                    className={
                                                        currentPage === 1
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer hover:text-orange-600'
                                                    }
                                                />
                                            </PaginationItem>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        isActive={
                                                            page === currentPage
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                        className={
                                                            page === currentPage
                                                                ? 'border-none bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 hover:text-white'
                                                                : 'cursor-pointer hover:border-orange-500 hover:text-orange-600'
                                                        }
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        setCurrentPage((p) =>
                                                            Math.min(
                                                                totalPages,
                                                                p + 1,
                                                            ),
                                                        )
                                                    }
                                                    className={
                                                        currentPage ===
                                                        totalPages
                                                            ? 'pointer-events-none opacity-50'
                                                            : 'cursor-pointer hover:text-orange-600'
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    ) : (
                        // EMPTY STATE
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
                                <Search className="h-12 w-12 text-orange-500 opacity-50" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                No reporters found
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Try adjusting your search terms.
                            </p>
                            <Button
                                onClick={() => handleSearch('')}
                                className="mt-6 rounded-full bg-orange-600 hover:bg-orange-700"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}

// --- card component (GRID VIEW) ---
function ReporterCard({ reporter }: { reporter: Reporter }) {
    return (
        <Card className="group relative overflow-hidden rounded-3xl border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <CardContent className="p-8 text-center">
                {/* Photo Wrapper */}
                <div className="relative mx-auto mb-6 h-32 w-32">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30" />

                    {/* Avatar Shadcn */}
                    <Avatar className="relative h-full w-full rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:border-orange-400">
                        <AvatarImage
                            src={reporter.photo}
                            alt={reporter.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-orange-100 text-2xl font-bold text-orange-600">
                            {reporter.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Floating Stats Badge */}
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-lg">
                        <Badge className="flex items-center gap-1 rounded-full border-none bg-gradient-to-br from-orange-500 to-rose-500 px-2 py-0.5 text-[10px] text-white hover:from-orange-600 hover:to-rose-600">
                            <TrendingUp className="h-3 w-3" />
                            {reporter.total_publi}
                        </Badge>
                    </div>
                </div>

                {/* Infos */}
                <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                    {reporter.name}
                </h3>
                <p className="mb-6 text-sm font-medium text-gray-500">
                    @{reporter.username}
                </p>

                {/* Categories */}
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {reporter.categories.slice(0, 3).map((cat, idx) => (
                        <Badge
                            key={idx}
                            variant="outline"
                            className="border-orange-100 bg-orange-50 px-3 py-1 font-semibold text-orange-700 hover:bg-orange-100"
                        >
                            {cat.name}
                        </Badge>
                    ))}
                </div>

                {/* Action */}
                <Button className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 py-6 font-semibold shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
                    <a
                        href={route('find.more', {
                            username: reporter.username,
                        })}
                    >
                        View Profile
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}

// --- COMPOSANT CARTE (LIST VIEW) ---
function ReporterListItem({ reporter }: { reporter: Reporter }) {
    return (
        <Card className="group overflow-hidden rounded-3xl border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col items-center gap-8 p-8 sm:flex-row">
                {/* Photo */}
                <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 opacity-20 blur-xl" />
                    <Avatar className="relative h-28 w-28 rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:border-orange-400">
                        <AvatarImage
                            src={reporter.photo}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {reporter.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-lg">
                        <Badge className="flex items-center gap-1 rounded-full border-none bg-gradient-to-br from-orange-500 to-rose-500 px-2 py-0.5 text-[10px] text-white">
                            <TrendingUp className="h-3 w-3" />
                            {reporter.total_publi}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                        {reporter.name}
                    </h3>
                    <p className="mb-4 font-medium text-gray-500">
                        @{reporter.username}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        {reporter.categories.map((cat, idx) => (
                            <Badge
                                key={idx}
                                variant="outline"
                                className="border-orange-100 bg-orange-50 px-3 py-1 font-semibold text-orange-700"
                            >
                                {cat.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <div className="flex-shrink-0">
                    <Button className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-6 font-semibold shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
                        <a
                            href={route('find.more', {
                                username: reporter.username,
                            })}
                        >
                            View Profile
                        </a>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
