import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    Eye,
    Link2,
    Share2,
} from 'lucide-react';
import { useState } from 'react';

// Interface Element
interface Element {
    encrypted_id: number;
    link: string;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
    name: string;
}

type Article = {
    link: string;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    name: string;
    username: string;
    photo: string;
    cover: string;
};

// Define the component's props, expecting a single reporter object
interface Props extends PageProps {
    article: Article;
    elements: Element[];
}

export default function ReporterProfile() {
    const { article, elements } = usePage<Props>().props;
    // const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = article.title;

        if (platform === 'x') {
            window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
                '_blank',
            );
        } else if (platform === 'facebook') {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                '_blank',
            );
        } else if (platform === 'linkedin') {
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                '_blank',
            );
        } else if (platform === 'instagram') {
            alert(
                'To share on Instagram, copy the link and paste it in your Instagram bio or story.',
            );
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
        setShowShareMenu(false);
    };

    const itemsPerPage = 3;
    const totalPages = Math.ceil(elements.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedElements = elements.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const truncateText = (text: string, maxLength: number) => {
        const stripped = text.replace(/<[^>]+>/g, '');
        return stripped.length > maxLength
            ? stripped.substring(0, maxLength) + '...'
            : stripped;
    };

    return (
        <GuestLayout>
            <Head title={article.title} />
            <div className="min-h-screen bg-white">
                {/* Navigation Bar */}
                <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Button
                                variant="ghost"
                                className="group"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back
                            </Button>

                            <div className="flex items-center gap-2">
                                {/* <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setIsBookmarked(!isBookmarked)
                                    }
                                    className={
                                        isBookmarked ? 'text-orange-600' : ''
                                    }
                                >
                                    <Bookmark
                                        className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`}
                                    />
                                </Button> */}

                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setShowShareMenu(!showShareMenu)
                                        }
                                    >
                                        <Share2 className="h-5 w-5" />
                                    </Button>

                                    {showShareMenu && (
                                        <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">
                                            <button
                                                onClick={() => handleShare('x')}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors hover:bg-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        X
                                                    </span>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleShare('facebook')
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors hover:bg-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        Facebook
                                                    </span>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleShare('instagram')
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors hover:bg-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        Instagram
                                                    </span>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleShare('linkedin')
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors hover:bg-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M1 6h4v13H1V6zm2-5C1.8 1 1 2 1 3.1 1 4.1 1.8 5 3 5c1.3 0 2-.9 2-2s-.8-2-2-2zm11.6 5.2c-2.1 0-3.3 1.2-3.8 2h-.1l-.2-1.7H6.9c0 1.1.1 2.4.1 3.9V19h4v-7.1c0-.4 0-.7.1-1 .3-.7.8-1.6 1.9-1.6 1.4 0 2 1.2 2 2.8V19h4v-7.4c0-3.7-1.9-5.4-4.4-5.4z"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        LinkedIn
                                                    </span>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleShare('copy')
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition-colors hover:bg-gray-100"
                                            >
                                                <Link2 className="h-4 w-4 text-gray-600" />
                                                <span className="text-sm font-medium">
                                                    Copy Link
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative h-[70vh] w-full overflow-hidden bg-black">
                    <img
                        src={article.cover}
                        alt={article.title}
                        className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute left-8 top-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white">
                            {article.cat_name} - {article.et_name} format
                        </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
                        <div className="max-w-4xl">
                            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                                {article.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Author & Meta Info */}
                    <div className="border-b border-gray-200 py-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={article.photo}
                                    alt={article.name}
                                    className="h-14 w-14 rounded-full object-cover ring-4 ring-orange-50"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {article.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        @{article.username}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatDate(article.updated_at)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>2.4K views</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Body */}
                    <article className="py-12">
                        <div
                            className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold prose-img:rounded-2xl prose-img:shadow-xl max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.desc }}
                        />
                    </article>

                    {/* Article Footer Actions */}
                    <div className="border-b border-t border-gray-200 py-8">
                        <div className="flex items-center justify-center">
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-xl">
                                    {article.et_name === 'Article'
                                        ? 'Read Full Article'
                                        : 'Watch Full Video'}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Author Bio */}
                    <div className="py-12">
                        <Card className="overflow-hidden rounded-3xl border-2 border-gray-200">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-6">
                                    <img
                                        src={article.photo}
                                        alt={article.name}
                                        className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-1 text-2xl font-bold text-gray-900">
                                                    {article.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    @{article.username}
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50"
                                            >
                                                <a
                                                    href={route('find.more', {
                                                        username:
                                                            article.username,
                                                    })}
                                                >
                                                    Follow
                                                </a>
                                            </Button>
                                        </div>
                                        {/* <div className="flex items-center gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>156 articles</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-4 w-4" />
                                                <span>2.4M views</span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                More from {article.name}
                            </h2>
                            <p className="text-gray-600">
                                Continue exploring related stories
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {paginatedElements.map((related) => (
                                <a
                                    key={related.encrypted_id}
                                    href={route('find.pubmore', {
                                        title: related.encrypted_id,
                                    })}
                                >
                                    {' '}
                                    <Card className="group transform cursor-pointer overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={related.cover}
                                                alt={related.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute left-4 top-4">
                                                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-sm">
                                                    {related.cat_name}
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                {truncateText(
                                                    related.title,
                                                    20,
                                                )}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {formatDate(related.updated_at)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </div>

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
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="rounded-xl border-2 disabled:opacity-50"
                                    >
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
                                                            page === currentPage
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                        className={`h-10 w-10 rounded-xl border-2 ${
                                                            page === currentPage
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
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="rounded-xl border-2 disabled:opacity-50"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
