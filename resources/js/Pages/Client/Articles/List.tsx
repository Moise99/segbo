'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileText,
    Grid3x3,
    List,
    Search,
    SlidersHorizontal,
    Tag,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

// Interface Element
interface Element {
    encrypted_id: number;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
    username: string;
    name: string;
    photo: string;
    viewers: number;
}

interface FlashMessages {
    success?: string;
    error?: string;
}

// Props pour la page
interface Props extends PageProps {
    elements: Element[];
    flash: FlashMessages;
}

export default function ArtilcleList() {
    const { elements, flash = {} } = usePage<Props>().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const itemsPerPage = 8;

    // Get unique categories and types
    const categories = useMemo(() => {
        const cats = Array.from(new Set(elements.map((el) => el.cat_name)));
        return ['all', ...cats];
    }, [elements]);

    const types = useMemo(() => {
        const typs = Array.from(new Set(elements.map((el) => el.et_name)));
        return ['all', ...typs];
    }, [elements]);

    // Filter logic
    const filteredElements = useMemo(() => {
        let filtered = elements;

        // Search filter
        if (searchTerm) {
            const lowercased = searchTerm.toLowerCase();
            filtered = filtered.filter((element) => {
                const titleMatch = element.title
                    .toLowerCase()
                    .includes(lowercased);
                const descMatch = element.desc
                    .toLowerCase()
                    .includes(lowercased);
                const categoryMatch = element.cat_name
                    .toLowerCase()
                    .includes(lowercased);
                const authorMatch = element.name
                    .toLowerCase()
                    .includes(lowercased);
                const usernameMatch = element.username
                    .toLowerCase()
                    .includes(lowercased);
                return (
                    titleMatch ||
                    descMatch ||
                    categoryMatch ||
                    authorMatch ||
                    usernameMatch
                );
            });
        }

        // Category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter((el) => el.cat_name === filterCategory);
        }

        // Type filter
        if (filterType !== 'all') {
            filtered = filtered.filter((el) => el.et_name === filterType);
        }

        return filtered;
    }, [elements, searchTerm, filterCategory, filterType]);

    // Pagination logic
    const totalPages = Math.ceil(filteredElements.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentElements = filteredElements.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setFilterCategory(value);
        setCurrentPage(1);
    };

    const handleTypeChange = (value: string) => {
        setFilterType(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    const truncateText = (text: string, maxLength: number) => {
        const stripped = text.replace(/<[^>]+>/g, '');
        return stripped.length > maxLength
            ? stripped.substring(0, maxLength) + '...'
            : stripped;
    };

    return (
        <GuestLayout>
            <Head title="Publications" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800">
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
                                <FileText className="h-4 w-4 text-white" />
                                <span className="text-sm font-medium text-white">
                                    {elements.length} Publications Available
                                </span>
                            </div>

                            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                                Latest Publications
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-orange-100">
                                Discover compelling stories from our talented
                                journalists
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl">
                        {/* Search Bar */}
                        <div className="mb-4 flex flex-col gap-4 lg:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by title, category, or author..."
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

                        {/* Filters */}
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                            <div className="flex-1">
                                <Select
                                    value={filterCategory}
                                    onValueChange={handleCategoryChange}
                                >
                                    <SelectTrigger className="rounded-xl border-2">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            <SelectValue placeholder="All Categories" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat === 'all'
                                                    ? 'All Categories'
                                                    : cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <Select
                                    value={filterType}
                                    onValueChange={handleTypeChange}
                                >
                                    <SelectTrigger className="rounded-xl border-2">
                                        <div className="flex items-center gap-2">
                                            <SlidersHorizontal className="h-4 w-4" />
                                            <SelectValue placeholder="All Types" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type === 'all'
                                                    ? 'All Types'
                                                    : type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>
                                Showing {startIndex + 1}-
                                {Math.min(endIndex, filteredElements.length)} of{' '}
                                {filteredElements.length} publications
                            </span>
                            {(searchTerm ||
                                filterCategory !== 'all' ||
                                filterType !== 'all') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterCategory('all');
                                        setFilterType('all');
                                        setCurrentPage(1);
                                    }}
                                    className="text-orange-600 hover:text-orange-700"
                                >
                                    Clear filters
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Publications Grid/List */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {currentElements.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    {currentElements.map((element) => (
                                        <Card
                                            key={element.encrypted_id}
                                            className="group transform overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            {/* Cover Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={element.cover}
                                                    alt={element.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                {/* Type Badge */}
                                                <div className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">
                                                    {element.et_name} -{' '}
                                                    {element.viewers} views
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <CardContent className="p-5">
                                                {/* Category */}
                                                <div className="mb-3 flex items-center gap-2">
                                                    <Tag className="h-3.5 w-3.5 text-orange-600" />
                                                    <span className="text-xs font-medium text-orange-600">
                                                        {element.cat_name}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                    {truncateText(
                                                        element.title,
                                                        60,
                                                    )}
                                                </h3>

                                                {/* Description */}
                                                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                                    {truncateText(
                                                        element.desc,
                                                        80,
                                                    )}
                                                </p>

                                                {/* Author & Date */}
                                                <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
                                                    <a
                                                        href={route(
                                                            'find.more',
                                                            {
                                                                username:
                                                                    element.username,
                                                            },
                                                        )}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <img
                                                            src={element.photo}
                                                            alt={element.name}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                        />
                                                    </a>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">
                                                            {element.name}
                                                        </p>
                                                        <p className="truncate text-sm font-medium text-gray-600">
                                                            {element.username}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(
                                                                element.updated_at,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <Button className="group/btn w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600">
                                                    <a
                                                        href={route(
                                                            'find.pubmore',
                                                            {
                                                                title: element.encrypted_id,
                                                            },
                                                        )}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Read Article
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {currentElements.map((element) => (
                                        <Card
                                            key={element.encrypted_id}
                                            className="group overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                                        >
                                            <CardContent className="p-0">
                                                <div className="flex flex-col sm:flex-row">
                                                    {/* Cover Image */}
                                                    <div className="relative h-56 w-full flex-shrink-0 overflow-hidden sm:w-80">
                                                        <img
                                                            src={element.cover}
                                                            alt={element.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1.5 text-xs font-bold text-white">
                                                            {element.et_name}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex flex-1 flex-col justify-between p-6">
                                                        <div>
                                                            {/* Category & Date */}
                                                            <div className="mb-3 flex items-center gap-4">
                                                                <div className="flex items-center gap-2">
                                                                    <Tag className="h-4 w-4 text-orange-600" />
                                                                    <span className="text-sm font-medium text-orange-600">
                                                                        {
                                                                            element.cat_name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-gray-500">
                                                                    <Calendar className="h-4 w-4" />
                                                                    <span className="text-sm">
                                                                        {formatDate(
                                                                            element.updated_at,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Title */}
                                                            <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                                {element.title}
                                                            </h3>

                                                            {/* Description */}
                                                            <p className="mb-4 leading-relaxed text-gray-600">
                                                                {truncateText(
                                                                    element.desc,
                                                                    150,
                                                                )}
                                                            </p>

                                                            {/* Author */}
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={
                                                                        element.photo
                                                                    }
                                                                    alt={
                                                                        element.name
                                                                    }
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        {
                                                                            element.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        @
                                                                        {
                                                                            element.username
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Action Button */}
                                                        <div className="mt-4">
                                                            <Button className="group/btn rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 text-white hover:from-orange-700 hover:to-orange-600">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Read Full
                                                                Article
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
                                    <div className="text-sm text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>

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

                                        <div className="flex gap-1">
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
                                                                setCurrentPage(
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
                                No publications found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Try adjusting your filters or search terms
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterCategory('all');
                                    setFilterType('all');
                                    setCurrentPage(1);
                                }}
                                className="rounded-full bg-orange-600 px-8 text-white hover:bg-orange-700"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
