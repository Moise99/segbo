import { Button } from '@/components/ui/button';
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
    const itemsPerPage = 4;

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
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {currentReporters.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {currentReporters.map((reporter, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            {/* Card Content */}
                                            <div className="p-8 text-center">
                                                {/* Photo - Now Rounded */}
                                                <div className="relative mx-auto mb-6 h-32 w-32">
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>
                                                    <img
                                                        src={reporter.photo}
                                                        alt={reporter.name}
                                                        className="relative h-full w-full rounded-full object-cover shadow-xl ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:ring-orange-400"
                                                    />

                                                    {/* Floating Badge */}
                                                    <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 p-2.5 shadow-lg">
                                                        <div className="flex items-center gap-1 text-white">
                                                            <TrendingUp className="h-3.5 w-3.5" />
                                                            <span className="text-xs font-bold">
                                                                {getTotalPubs(
                                                                    reporter,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Name & Username */}
                                                <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                    {reporter.name}
                                                </h3>
                                                <p className="mb-6 text-sm font-medium text-gray-500">
                                                    @{reporter.username}
                                                </p>

                                                {/* Categories */}
                                                <div className="mb-6 flex flex-wrap justify-center gap-2">
                                                    {reporter.categories
                                                        .slice(0, 3)
                                                        .map(
                                                            (cat, catIndex) => (
                                                                <span
                                                                    key={
                                                                        catIndex
                                                                    }
                                                                    className="rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-700"
                                                                >
                                                                    {cat.name}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>

                                                {/* Action Button */}
                                                <button className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {currentReporters.map((reporter, index) => (
                                        <div
                                            key={index}
                                            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                                        >
                                            <div className="flex flex-col items-center gap-8 p-8 sm:flex-row">
                                                {/* Photo */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 opacity-20 blur-xl"></div>
                                                    <img
                                                        src={reporter.photo}
                                                        alt={reporter.name}
                                                        className="relative h-28 w-28 rounded-full object-cover shadow-xl ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:ring-orange-400"
                                                    />
                                                    <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 p-2.5 shadow-lg">
                                                        <div className="flex items-center gap-1 text-white">
                                                            <TrendingUp className="h-3.5 w-3.5" />
                                                            <span className="text-xs font-bold">
                                                                {getTotalPubs(
                                                                    reporter,
                                                                )}
                                                            </span>
                                                        </div>
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
                                                        {reporter.categories.map(
                                                            (cat, catIndex) => (
                                                                <span
                                                                    key={
                                                                        catIndex
                                                                    }
                                                                    className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700"
                                                                >
                                                                    {cat.name} (
                                                                    {cat.count})
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Button */}
                                                <button className="flex-shrink-0 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
                                    <div className="text-sm font-medium text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className="rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>

                                        <div className="flex gap-2">
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((page) => {
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 &&
                                                        page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    page,
                                                                )
                                                            }
                                                            className={`h-11 w-11 rounded-xl text-sm font-semibold transition-all ${
                                                                page ===
                                                                currentPage
                                                                    ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30'
                                                                    : 'border-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600'
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
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

                                        <button
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className="rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-rose-100">
                                <Search className="h-12 w-12 text-orange-500" />
                            </div>
                            <h3 className="mb-3 text-3xl font-bold text-gray-900">
                                No reporters found
                            </h3>
                            <p className="mb-8 text-lg text-gray-600">
                                Try adjusting your search terms
                            </p>
                            <button
                                onClick={() => handleSearch('')}
                                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
