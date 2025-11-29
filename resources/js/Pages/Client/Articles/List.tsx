'use client';
import { Badge } from '@/components/ui/badge'; // NEW: Add Badge for tags
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
// Si vous avez un composant `Sheet` pour les filtres mobiles (RECOMMANDÉ)
//import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GuestLayout from '@/Layouts/GuestLayout';
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir l'utilitaire cn (clsx + tailwind-merge)
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileText,
    Grid3x3,
    List, // Renamed 'List' icon import to 'ListIcon' to avoid conflict
    Search,
    SlidersHorizontal,
    Tag,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const ListIcon = List; // Renaming the icon import

// --- Interfaces ---
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

interface Props extends PageProps {
    elements: Element[];
    filterByUsername?: string;
    flash: FlashMessages;
}

// --- Utility Functions  ---
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

// --- Article Card Component (Grid View) ---
interface ArticleCardProps {
    element: Element;
}

const ArticleCard = ({ element }: ArticleCardProps) => (
    <Card
        key={element.encrypted_id}
        className="group transform overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
            <img
                src={element.cover}
                alt={element.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Type Badge (uses shadcn/ui Badge now) */}
            <Badge className="absolute left-4 top-4 bg-orange-600 px-3 py-1 text-xs font-bold text-white hover:bg-orange-700">
                {element.et_name}
            </Badge>
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                <Eye className="h-3 w-3" />
                <span>{element.viewers}</span>
            </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
            {/* Category */}
            <div className="mb-2 flex items-center gap-2">
                <Tag className="h-3 w-3 text-blue-600" />{' '}
                {/* Use blue for category icon */}
                <span className="text-xs font-medium text-blue-600">
                    {element.cat_name}
                </span>
                {/* date of publication */}
                <span className="text-xs text-gray-400">•</span>
                <Calendar className="h-3 w-3" />
                <span className="text-xs text-gray-500">
                    {formatDate(element.updated_at)}
                </span>
            </div>

            {/* Title */}
            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                {truncateText(element.title, 60)}
            </h3>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                {truncateText(element.desc, 80)}
            </p>

            {/* Author & Date (Cleaner display) */}
            <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <a
                    href={route('find.more', { username: element.username })}
                    className="flex items-center gap-2"
                >
                    <Avatar className="h-10 w-10 rounded-2xl">
                        <AvatarImage
                            src={element.photo}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-orange-100 text-base font-semibold text-orange-700">
                            {element.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                            {element.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                            @{element.username}
                        </p>
                    </div>
                </a>
            </div>

            {/* Action Button (Now uses orange consistently) */}
            <Button className="w-full rounded-lg bg-orange-600 text-white hover:bg-orange-700">
                <a
                    href={route('find.pubmore', {
                        title: element.encrypted_id,
                    })}
                    className="flex items-center gap-2"
                >
                    <Eye className="h-4 w-4" />
                    {element.et_name === 'Video' ? 'Watch now' : 'Read Article'}
                </a>
            </Button>
        </CardContent>
    </Card>
);

// --- Article List Item Component (List View) ---
const ArticleListItem = ({ element }: ArticleCardProps) => (
    <Card
        key={element.encrypted_id}
        className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
    >
        <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
                {/* Cover Image */}
                <div className="relative h-56 w-full flex-shrink-0 overflow-hidden sm:w-80">
                    <img
                        src={element.cover}
                        alt={element.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute left-4 top-4 bg-orange-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-700">
                        {element.et_name}
                    </Badge>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                        {/* Category & Date */}
                        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            {/* Category Badge */}
                            <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                                <Tag className="mr-2 h-3.5 w-3.5" />
                                {element.cat_name}
                            </Badge>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(element.updated_at)}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 sm:text-2xl">
                            {element.title}
                        </h3>

                        {/* Description */}
                        <p className="mb-4 leading-relaxed text-gray-600">
                            {truncateText(element.desc, 150)}
                        </p>

                        {/* Author */}
                        <a
                            href={route('find.more', {
                                username: element.username,
                            })}
                            className="flex items-center gap-3 transition-opacity hover:opacity-80"
                        >
                            <Avatar className="h-10 w-10 rounded-2xl">
                                <AvatarImage
                                    src={element.photo}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-orange-100 text-base font-semibold text-orange-700">
                                    {element.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {element.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    @{element.username}
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* Action Button (Now uses orange consistently) */}
                    <div className="mt-6">
                        <Button className="rounded-lg bg-orange-600 px-8 text-white hover:bg-orange-700">
                            <a
                                href={route('find.pubmore', {
                                    title: element.encrypted_id,
                                })}
                                className="flex items-center gap-2"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                {element.et_name === 'Video'
                                    ? 'Watch now'
                                    : 'Read Article'}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

// --- Main Component ---

export default function ArtilcleList() {
    const { elements, filterByUsername, flash = {} } = usePage<Props>().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const [searchTerm, setSearchTerm] = useState(filterByUsername ?? '');
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

    // Handlers
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

    return (
        <GuestLayout>
            <Head title="Publications" />
            <div className="min-h-screen bg-gray-50">
                <div className="relative overflow-hidden bg-blue-800">
                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <Badge
                                variant="outline"
                                className="mb-4 inline-flex items-center gap-2 border-white/50 bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
                            >
                                <FileText className="h-4 w-4 text-white" />
                                {elements.length} Publications Available
                            </Badge>

                            <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                                Publications
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-blue-200">
                                Discover compelling stories from our talented
                                Segbons
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section (Cleaner design) */}
                <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card className="rounded-xl p-6 shadow-2xl">
                        {/* Search Bar & Toggle */}
                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by title, category, or author..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="rounded-lg py-6 pl-12 pr-4 text-base focus:border-blue-500"
                                />
                            </div>

                            {/* View Toggle (Cleaner classes) */}
                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
                                <Button
                                    variant={
                                        viewMode === 'grid'
                                            ? 'default'
                                            : 'ghost'
                                    }
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        viewMode === 'grid'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'text-gray-600 hover:bg-gray-200',
                                    )}
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
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        viewMode === 'list'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'text-gray-600 hover:bg-gray-200',
                                    )}
                                >
                                    <ListIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Filters (Cleaned up Select styles) */}
                        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                            <div className="flex-1">
                                <Select
                                    value={filterCategory}
                                    onValueChange={handleCategoryChange}
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-gray-500" />
                                            <SelectValue placeholder="Toutes Catégories" />
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
                                    <SelectTrigger className="rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                                            <SelectValue placeholder="Tous Types" />
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

                        {/* Results count & Clear Filters */}
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
                                    className="text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                                >
                                    Clear filter
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Publications Grid/List */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {currentElements.length > 0 ? (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                    {currentElements.map((element) => (
                                        <ArticleCard
                                            key={element.encrypted_id}
                                            element={element}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {currentElements.map((element) => (
                                        <ArticleListItem
                                            key={element.encrypted_id}
                                            element={element}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Pagination (Cleaner style) */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <div className="text-sm text-gray-600">
                                        Page {currentPage} on {totalPages}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1,
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="h-10 w-10 rounded-full border-gray-200 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
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
                                                                    : 'ghost'
                                                            }
                                                            size="icon"
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    page,
                                                                )
                                                            }
                                                            className={cn(
                                                                'h-10 w-10 rounded-full text-sm font-medium',
                                                                page ===
                                                                    currentPage
                                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                    : 'text-gray-700 hover:bg-gray-100',
                                                            )}
                                                        >
                                                            {page}
                                                        </Button>
                                                    );
                                                } else if (
                                                    (page === currentPage - 2 &&
                                                        currentPage > 3) ||
                                                    (page === currentPage + 2 &&
                                                        currentPage <
                                                            totalPages - 2)
                                                ) {
                                                    return (
                                                        <span
                                                            key={page}
                                                            className="flex h-10 w-10 items-center justify-center px-2 text-gray-400"
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
                                            size="icon"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1,
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className="h-10 w-10 rounded-full border-gray-200 disabled:opacity-50"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // No results state (Uses standard Empty State pattern)
                        <div className="py-20 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                                No publication found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Try adjusting your search or filters to find
                                what you're looking for.
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
