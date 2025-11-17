// src/Pages/ReporterProfile.tsx

import SubscribeForm from '@/components/SubscribeForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Bell,
    BellOff,
    Calendar,
    ChevronRight,
    FileText,
    Search,
    Star,
} from 'lucide-react';
import { useMemo, useState } from 'react';

// Interface Element
interface Element {
    encrypted_id: number;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
}

// Type definitions for the data
type Category = {
    name: string;
    pub_count: number;
};

type Reporter = {
    name: string;
    username: string;
    present: string; // Biography/About section
    photo: string;
    x: string | null;
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
    website: string | null;
    categories: Category[];
};

interface FlashMessages {
    success?: string;
    error?: string;
}
// Define the component's props, expecting a single reporter object
interface Props extends PageProps {
    reporter: Reporter;
    elements: Element[];
    flash: FlashMessages;
    activeSubscribers: string[];
}

export default function ReporterProfile() {
    const { reporter, elements, activeSubscribers } = usePage<Props>().props;
    const storedEmail = localStorage.getItem(`subscriber_${reporter.username}`);
    const isSubscribedInitial = storedEmail
        ? activeSubscribers.includes(storedEmail)
        : false;

    const [searchTerm, setSearchTerm] = useState('');

    // Calculate stats
    const totalPublications = reporter.categories.reduce(
        (sum, cat) => sum + cat.pub_count,
        0,
    );
    const totalViews = '2.4M';
    const followers = '12.5K';

    // Filter publications
    const filteredElements = useMemo(() => {
        if (!searchTerm) return elements;
        const lowercased = searchTerm.toLowerCase();
        return elements.filter(
            (el) =>
                el.title.toLowerCase().includes(lowercased) ||
                el.cat_name.toLowerCase().includes(lowercased) ||
                el.desc.toLowerCase().includes(lowercased),
        );
    }, [elements, searchTerm]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    return (
        <GuestLayout>
            <Head title={reporter.name} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-100">
                {/* Hero Section with Cover */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, #fff 1px, transparent 1px)',
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>

                    {/* Back Button */}
                    <div className="absolute left-6 top-6 z-10">
                        <Button
                            variant="ghost"
                            className="border border-white/30 bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Journalists
                        </Button>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="relative z-20 mx-auto -mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Left Column - Profile Info */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6 overflow-hidden rounded-3xl border-0 shadow-2xl">
                                <CardContent className="p-0">
                                    {/* Profile Image */}
                                    <div className="relative">
                                        <img
                                            src={reporter.photo}
                                            alt={reporter.name}
                                            className="aspect-square w-full object-cover"
                                        />
                                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                            <div className="flex items-center gap-2">
                                                <Award className="h-5 w-5 text-orange-400" />
                                                <span className="text-sm font-medium text-white">
                                                    Verified Journalist
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Profile Details */}
                                    <div className="p-6">
                                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                            {reporter.name}
                                        </h1>
                                        <p className="mb-6 text-lg text-gray-600">
                                            @{reporter.username}
                                        </p>

                                        {/* Stats Grid */}
                                        <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {totalPublications}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    Articles
                                                </div>
                                            </div>
                                            <div className="border-x border-orange-200 text-center">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {totalViews}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    Views
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {followers}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    Followers
                                                </div>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {reporter.website && (
                                                <a
                                                    href={reporter.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-100 hover:text-orange-600">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 512 512"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                        >
                                                            <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667 c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146 z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034 C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187 h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306 c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50 H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414 C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404 c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514 H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667 c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593 C381.469,407.717,366.807,418.738,351.021,427.514z"></path>
                                                        </svg>
                                                    </button>
                                                </a>
                                            )}
                                            {reporter.x && (
                                                <a
                                                    href={reporter.x}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-100 hover:text-orange-600">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <title>X</title>
                                                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                                        </svg>
                                                    </button>
                                                </a>
                                            )}
                                            {reporter.facebook && (
                                                <a
                                                    href={reporter.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-100 hover:text-orange-600">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <title>
                                                                Facebook
                                                            </title>
                                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                                        </svg>
                                                    </button>
                                                </a>
                                            )}
                                            {reporter.linkedin && (
                                                <a
                                                    href={reporter.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-100 hover:text-orange-600">
                                                        <svg
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                        >
                                                            <path d="M1 6h4v13H1V6zm2-5C1.8 1 1 2 1 3.1 1 4.1 1.8 5 3 5c1.3 0 2-.9 2-2s-.8-2-2-2zm11.6 5.2c-2.1 0-3.3 1.2-3.8 2h-.1l-.2-1.7H6.9c0 1.1.1 2.4.1 3.9V19h4v-7.1c0-.4 0-.7.1-1 .3-.7.8-1.6 1.9-1.6 1.4 0 2 1.2 2 2.8V19h4v-7.4c0-3.7-1.9-5.4-4.4-5.4z"></path>
                                                        </svg>
                                                    </button>
                                                </a>
                                            )}
                                            {reporter.instagram && (
                                                <a
                                                    href={reporter.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-orange-100 hover:text-orange-600">
                                                        <svg
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <title>
                                                                Instagram
                                                            </title>
                                                            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                                        </svg>
                                                    </button>
                                                </a>
                                            )}
                                        </div>

                                        {/* Expertise Tags */}
                                        <div className="mb-6">
                                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">
                                                Expertise
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {reporter.categories.map(
                                                    (cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700"
                                                        >
                                                            {cat.name} (
                                                            {cat.pub_count})
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {/* Subscribe Section */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                {isSubscribedInitial ? (
                                                    <BellOff className="h-4 w-4" />
                                                ) : (
                                                    <Bell className="h-4 w-4" />
                                                )}
                                                {isSubscribedInitial
                                                    ? 'Subscribed'
                                                    : 'Get Updates'}
                                            </h3>
                                            <div className="space-y-2">
                                                <SubscribeForm
                                                    username={reporter.username}
                                                    initialEmail={
                                                        storedEmail || ''
                                                    }
                                                    isSubscribed={
                                                        isSubscribedInitial
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* About Section */}
                            <Card className="rounded-3xl border-0 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                                            <Star className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Bio
                                        </h2>
                                    </div>
                                    <div
                                        className="prose prose-lg max-w-none leading-relaxed text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: reporter.present,
                                        }}
                                    />
                                </CardContent>
                            </Card>

                            {/* Publications Section */}
                            <Card className="rounded-3xl border-0 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                                                <FileText className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">
                                                    Publications
                                                </h2>
                                                <p className="text-sm text-gray-600">
                                                    {filteredElements.length}{' '}
                                                    articles
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative mb-6">
                                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search articles..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="rounded-2xl border-2 py-6 pl-12 pr-4"
                                        />
                                    </div>

                                    {/* Articles Grid */}
                                    <div className="space-y-4">
                                        {filteredElements.length > 0 ? (
                                            filteredElements.map((article) => (
                                                <div
                                                    key={article.encrypted_id}
                                                    className="group flex cursor-pointer gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-gray-200 hover:bg-gray-50"
                                                >
                                                    {/* Article Image */}
                                                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
                                                        <img
                                                            src={article.cover}
                                                            alt={article.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                        <div className="absolute left-2 top-2">
                                                            <span className="rounded-lg bg-orange-600 px-2 py-1 text-xs font-bold text-white">
                                                                {
                                                                    article.et_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Article Info */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="text-xs font-medium text-orange-600">
                                                                {
                                                                    article.cat_name
                                                                }
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                •
                                                            </span>
                                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDate(
                                                                    article.updated_at,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                                            {article.title}
                                                        </h3>
                                                        <div
                                                            className="mb-3 line-clamp-2 text-sm text-gray-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: article.desc,
                                                            }}
                                                        />
                                                    <a
                                                        href={route(
                                                            'find.pubmore',
                                                            {
                                                                title: article.encrypted_id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-auto p-0 font-medium text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                                                        >
                                                            Read article
                                                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </Button>
                                                    </a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-12 text-center">
                                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                    <Search className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-600">
                                                    No articles found
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Bottom Spacing */}
                <div className="h-20" />
            </div>
        </GuestLayout>
    );
}
