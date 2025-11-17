import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Award,
    ChevronLeft,
    ChevronRight,
    Grid3x3,
    List,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useMemo, useState } from 'react';

// Type definitions for the data
type Category = {
    name: string;
    count: number;
};

type Reporter = {
    name: string;
    username: string;
    photo: string;
    categories: Category[];
};

interface Props extends PageProps {
    reporters: Reporter[];
}

export default function Reporters() {
    const { reporters } = usePage<Props>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const itemsPerPage = 8;

    // Filter logic
    const filteredReporters = useMemo(() => {
        if (!searchTerm) return reporters;

        const lowercased = searchTerm.toLowerCase();
        return reporters.filter((reporter) => {
            const nameMatch = reporter.name.toLowerCase().includes(lowercased);
            const usernameMatch = reporter.username
                .toLowerCase()
                .includes(lowercased);
            const categoryMatch = reporter.categories.some((cat) =>
                cat.name.toLowerCase().includes(lowercased),
            );
            return nameMatch || usernameMatch || categoryMatch;
        });
    }, [reporters, searchTerm]);

    // Pagination logic
    const totalPages = Math.ceil(filteredReporters.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReporters = filteredReporters.slice(startIndex, endIndex);

    // Reset to page 1 when search changes
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get total publications count
    const getTotalPubs = (reporter: (typeof reporters)[0]) => {
        return reporter.categories.reduce((sum, cat) => sum + cat.count, 0);
    };

    return (
        <GuestLayout>
            <Head title="Reporters" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, #fff 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                                <Award className="h-4 w-4 text-white" />
                                <span className="text-sm font-medium text-white">
                                    {reporters.length} Expert Journalists
                                </span>
                            </div>

                            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                                Meet Our Segbons
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-orange-100">
                                Discover talented storytellers and their areas
                                of expertise
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl">
                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                            {/* Search Bar */}
                            <div className="relative w-full flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by name, username, or expertise..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="rounded-2xl border-2 border-gray-200 py-6 pl-12 pr-4 text-lg transition-colors focus:border-orange-500"
                                />
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center gap-2 rounded-2xl bg-gray-100 p-1">
                                <Button
                                    variant={
                                        viewMode === 'grid'
                                            ? 'default'
                                            : 'ghost'
                                    }
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className={`rounded-xl ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-gray-600'}`}
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
                                    className={`rounded-xl ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600'}`}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <span>
                                Showing {startIndex + 1}-
                                {Math.min(endIndex, filteredReporters.length)}{' '}
                                of {filteredReporters.length} journalists
                            </span>
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSearch('')}
                                    className="text-orange-600 hover:text-orange-700"
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reporters Grid/List */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {currentReporters.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {currentReporters.map((reporter, index) => (
                                        <Card
                                            key={index}
                                            className="group transform overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            {/* Photo with gradient overlay */}
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={reporter.photo}
                                                    alt={reporter.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                {/* Floating stats badge */}
                                                <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                                                    <div className="flex items-center gap-1">
                                                        <TrendingUp className="h-3.5 w-3.5 text-orange-600" />
                                                        <span className="text-xs font-bold text-gray-900">
                                                            {getTotalPubs(
                                                                reporter,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Name overlay on image */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="mb-1 text-lg font-bold text-white">
                                                        {reporter.name}
                                                    </h3>
                                                    <p className="text-sm text-orange-200">
                                                        @{reporter.username}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <CardContent className="p-5">
                                                {/* Categories */}
                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    {reporter.categories
                                                        .slice(0, 3)
                                                        .map(
                                                            (cat, catIndex) => (
                                                                <span
                                                                    key={
                                                                        catIndex
                                                                    }
                                                                    className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                                                                >
                                                                    {cat.name}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>

                                                {/* Action Button */}
                                                <Button className="group/btn w-full rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:from-orange-700 hover:to-orange-600">
                                                    <a
                                                        href={route(
                                                            'find.more',
                                                            {
                                                                username:
                                                                    reporter.username,
                                                            },
                                                        )}
                                                        className="flex items-center gap-2"
                                                    >
                                                        View Profile
                                                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {currentReporters.map((reporter, index) => (
                                        <Card
                                            key={index}
                                            className="group overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                                        >
                                            <CardContent className="p-0">
                                                <div className="flex flex-col sm:flex-row">
                                                    {/* Photo */}
                                                    <div className="relative h-48 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-48">
                                                        <img
                                                            src={reporter.photo}
                                                            alt={reporter.name}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                                                            <div className="flex items-center gap-1">
                                                                <TrendingUp className="h-3.5 w-3.5 text-orange-600" />
                                                                <span className="text-xs font-bold text-gray-900">
                                                                    {getTotalPubs(
                                                                        reporter,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex flex-1 flex-col justify-between p-6">
                                                        <div>
                                                            <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                                {reporter.name}
                                                            </h3>
                                                            <p className="mb-4 text-gray-500">
                                                                @
                                                                {
                                                                    reporter.username
                                                                }
                                                            </p>

                                                            {/* Categories with counts */}
                                                            <div className="mb-4 flex flex-wrap gap-2">
                                                                {reporter.categories.map(
                                                                    (
                                                                        cat,
                                                                        catIndex,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                catIndex
                                                                            }
                                                                            className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700"
                                                                        >
                                                                            {
                                                                                cat.name
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                cat.count
                                                                            }
                                                                            )
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-3">
                                                            <Button className="group/btn flex-1 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:from-orange-700 hover:to-orange-600">
                                                                View Profile
                                                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    {/* Page info */}
                                    <div className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    {/* Pagination buttons */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1,
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="rounded-xl border-2 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>

                                        {/* Page numbers */}
                                        <div className="flex gap-1">
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => {
                                                // Show first, last, current, and adjacent pages
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 &&
                                                        page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <Button
                                                            key={page}
                                                            variant={
                                                                page ===
                                                                currentPage
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    page,
                                                                )
                                                            }
                                                            className={`h-10 w-10 rounded-xl border-2 ${
                                                                page ===
                                                                currentPage
                                                                    ? 'border-orange-600 bg-orange-600 text-white'
                                                                    : 'border-gray-200 hover:border-orange-500'
                                                            }`}
                                                        >
                                                            {page}
                                                        </Button>
                                                    );
                                                } else if (
                                                    page === currentPage - 2 ||
                                                    page === currentPage + 2
                                                ) {
                                                    return (
                                                        <span
                                                            key={page}
                                                            className="flex items-center px-2 text-gray-400"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1,
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className="rounded-xl border-2 disabled:opacity-50"
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-gray-900">
                                No reporters found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Try adjusting your search terms
                            </p>
                            <Button
                                onClick={() => handleSearch('')}
                                className="rounded-full bg-orange-600 px-8 text-white hover:bg-orange-700"
                            >
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
