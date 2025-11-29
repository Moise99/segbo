import SubscribeForm from '@/components/SubscribeForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Bg from '@/images/segbohero.png';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Bell,
    BellOff,
    Calendar,
    FileText,
    Globe,
    User,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// --- TYPES ---
interface Element {
    encrypted_id: number;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
}

type Category = {
    name: string;
    pub_count: number;
};

type Reporter = {
    name: string;
    username: string;
    present: string;
    photo: string;
    x: string | null;
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
    tiktok: string | null;
    website: string | null;
    total_subs: number;
    total_viewers: number;
    total_publi: number;
    categories: Category[];
};

interface FlashMessages {
    success?: string;
    error?: string;
}

interface Props extends PageProps {
    reporter: Reporter;
    elements: Element[];
    flash: FlashMessages;
    initialEmail: string;
    isSubscribed: boolean;
}

export default function ReporterProfile() {
    const {
        reporter,
        elements,
        initialEmail,
        isSubscribed,
        flash = {},
    } = usePage<Props>().props;

    useEffect(() => {
        if (flash.error) toast.error(flash.error);
        if (flash.success) toast.success(flash.success);
    }, [flash]);

    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic
    const filteredElements = useMemo(() => {
        if (!searchTerm) return elements;
        const lower = searchTerm.toLowerCase();
        return elements.filter(
            (el) =>
                el.title.toLowerCase().includes(lower) ||
                el.cat_name.toLowerCase().includes(lower) ||
                el.desc.toLowerCase().includes(lower),
        );
    }, [elements, searchTerm]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    // Helper of social icons
    const SocialButton = ({
        href,
        icon: Icon,
        colorClass,
    }: {
        href: string | null;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        colorClass: string;
    }) => {
        if (!href) return null;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                <Button
                    size="icon"
                    variant="outline"
                    className={`rounded-full border-gray-200 bg-gray-50 ${colorClass} transition-transform hover:scale-110`}
                >
                    <Icon className="h-4 w-4" />
                </Button>
            </a>
        );
    };

    return (
        <GuestLayout>
            <Head title={reporter.name} />
            <Toaster position="top-center" />

            <div className="min-h-screen bg-slate-50/50">
                {/* 1. HERO COVER */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-rose-500 opacity-90" />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url(${Bg})`,
                            backgroundSize: 'cover',
                        }}
                    ></div>

                    <div className="absolute left-4 top-4 z-10">
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/20 hover:text-white"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* 2. SIDEBAR (PROFILE CARD) - Sticky Desktop */}
                        <div className="relative -mt-24 lg:col-span-4 lg:block">
                            <Card className="sticky top-6 overflow-hidden rounded-3xl border-none shadow-2xl">
                                <CardContent className="px-6 pb-6 pt-0">
                                    {/* Avatar Section */}
                                    <div className="-mt-13 mb-4 flex flex-col items-center">
                                        <div className="relative">
                                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                                <AvatarImage
                                                    src={reporter.photo}
                                                    alt={reporter.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-orange-100 text-2xl text-orange-600">
                                                    {reporter.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {/* Badge Verified (Optionnal) */}
                                            {/* <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white"><Check className="h-3 w-3"/></div> */}
                                        </div>

                                        <div className="mt-3 text-center">
                                            <h1 className="text-2xl font-bold text-gray-900">
                                                {reporter.name}
                                            </h1>
                                            <p className="text-sm font-medium text-orange-600">
                                                @{reporter.username}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="mb-6 grid grid-cols-3 gap-2 border-b border-t border-gray-100 py-6">
                                        <div className="text-center">
                                            <span className="block text-xl font-bold text-gray-900">
                                                {reporter.total_publi}
                                            </span>
                                            <span className="text-xs uppercase tracking-wide text-gray-500">
                                                Stories
                                            </span>
                                        </div>
                                        <div className="border-x border-gray-100 text-center">
                                            <span className="block text-xl font-bold text-gray-900">
                                                {reporter.total_viewers}
                                            </span>
                                            <span className="text-xs uppercase tracking-wide text-gray-500">
                                                Views
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xl font-bold text-gray-900">
                                                {reporter.total_subs}
                                            </span>
                                            <span className="text-xs uppercase tracking-wide text-gray-500">
                                                Subs
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expertise Badges */}
                                    <div className="mb-6">
                                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            Expertise
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {reporter.categories.map(
                                                (cat, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="bg-orange-50 text-orange-700 hover:bg-orange-100"
                                                    >
                                                        {cat.name}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="mb-6 flex justify-center gap-3">
                                        <SocialButton
                                            href={reporter.website}
                                            icon={Globe}
                                            colorClass="hover:text-blue-600"
                                        />
                                        <SocialButton
                                            href={reporter.x}
                                            icon={(
                                                props: React.SVGProps<SVGSVGElement>,
                                            ) => (
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    {...props}
                                                >
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            )}
                                            colorClass="hover:text-black"
                                        />
                                        <SocialButton
                                            href={reporter.facebook}
                                            icon={(
                                                props: React.SVGProps<SVGSVGElement>,
                                            ) => (
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    {...props}
                                                >
                                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                                </svg>
                                            )}
                                            colorClass="hover:text-blue-700"
                                        />
                                        <SocialButton
                                            href={reporter.instagram}
                                            icon={(
                                                props: React.SVGProps<SVGSVGElement>,
                                            ) => (
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    {...props}
                                                >
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        x="2"
                                                        y="2"
                                                        rx="5"
                                                        ry="5"
                                                    />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line
                                                        x1="17.5"
                                                        x2="17.51"
                                                        y1="6.5"
                                                        y2="6.5"
                                                    />
                                                </svg>
                                            )}
                                            colorClass="hover:text-pink-600"
                                        />
                                        <SocialButton
                                            href={reporter.linkedin}
                                            icon={(
                                                props: React.SVGProps<SVGSVGElement>,
                                            ) => (
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    {...props}
                                                >
                                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                    <rect
                                                        width="4"
                                                        height="12"
                                                        x="2"
                                                        y="9"
                                                    />
                                                    <circle
                                                        cx="4"
                                                        cy="4"
                                                        r="2"
                                                    />
                                                </svg>
                                            )}
                                            colorClass="hover:text-blue-800"
                                        />
                                        <SocialButton
                                            href={reporter.tiktok}
                                            icon={(
                                                props: React.SVGProps<SVGSVGElement>,
                                            ) => (
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    {...props}
                                                >
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                                </svg>
                                            )}
                                            colorClass="hover:text-black"
                                        />
                                    </div>

                                    <Separator className="my-6" />

                                    {/* Subscribe Box */}
                                    <div>
                                        <div className="mb-4 flex items-center gap-2">
                                            {isSubscribed ? (
                                                <Bell className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <BellOff className="h-4 w-4 text-orange-500" />
                                            )}
                                            <span className="text-sm font-semibold text-gray-700">
                                                {isSubscribed
                                                    ? 'Notifications ON'
                                                    : 'Get new stories'}
                                            </span>
                                        </div>
                                        <SubscribeForm
                                            username={reporter.username}
                                            initialEmail={initialEmail || ''}
                                            isSubscribed={isSubscribed}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 3. MAIN CONTENT (Tabs) */}
                        <div className="mt-8 pb-12 lg:col-span-8 lg:mt-0">
                            <Tabs defaultValue="articles" className="w-full">
                                <div className="mb-6 flex items-center justify-between">
                                    <TabsList className="h-auto rounded-xl border border-gray-200 bg-white p-1">
                                        <TabsTrigger
                                            value="articles"
                                            className="rounded-lg px-4 py-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />{' '}
                                            Latest pub
                                            <Badge
                                                variant="secondary"
                                                className="ml-2 bg-orange-200 text-orange-800 hover:bg-orange-200"
                                            >
                                                {filteredElements.length}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="about"
                                            className="rounded-lg px-4 py-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                                        >
                                            <User className="mr-2 h-4 w-4" />{' '}
                                            Biography
                                        </TabsTrigger>
                                    </TabsList>

                                    <div className="relative w-64">
                                        <form
                                            method="get"
                                            action={route('find.article')}
                                        >
                                            <input
                                                type="hidden"
                                                name="username"
                                                value={reporter.username}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600"
                                            >
                                                All my articles here
                                            </Button>
                                        </form>
                                    </div>
                                </div>

                                {/* TAB: ARTICLES */}
                                <TabsContent
                                    value="articles"
                                    className="space-y-6"
                                >
                                    <div className="mb-4 sm:hidden">
                                        <Input
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    {filteredElements.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {filteredElements.map((article) => (
                                                <Card
                                                    key={article.encrypted_id}
                                                    className="group overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl"
                                                >
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img
                                                            src={article.cover}
                                                            alt={article.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute left-3 top-3">
                                                            <Badge className="bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm hover:bg-white">
                                                                {
                                                                    article.cat_name
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-md">
                                                            <Calendar className="h-3 w-3" />{' '}
                                                            {formatDate(
                                                                article.updated_at,
                                                            )}
                                                        </div>
                                                    </div>
                                                    <CardContent className="p-5">
                                                        <div className="mb-3 flex items-center gap-2">
                                                            <Badge
                                                                variant="outline"
                                                                className="h-5 border-orange-200 px-2 text-[10px] text-orange-600"
                                                            >
                                                                {
                                                                    article.et_name
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600">
                                                            <a
                                                                href={route(
                                                                    'find.pubmore',
                                                                    {
                                                                        id: article.encrypted_id,
                                                                    },
                                                                )}
                                                            >
                                                                {article.title}
                                                            </a>
                                                        </h3>
                                                        <div
                                                            className="mb-4 line-clamp-2 text-sm text-gray-500"
                                                            dangerouslySetInnerHTML={{
                                                                __html: article.desc,
                                                            }}
                                                        />
                                                        <Button
                                                            asChild
                                                            variant="ghost"
                                                            className="h-auto p-0 text-orange-600 hover:bg-transparent hover:text-orange-700"
                                                        >
                                                            <a
                                                                href={route(
                                                                    'find.pubmore',
                                                                    {
                                                                        id: article.encrypted_id,
                                                                    },
                                                                )}
                                                                className="flex items-center"
                                                            >
                                                                {article.et_name ===
                                                                'Video'
                                                                    ? 'Watch now'
                                                                    : 'Read more'}{' '}
                                                                <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                                                            </a>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
                                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                                            <h3 className="text-lg font-medium text-gray-900">
                                                No stories found
                                            </h3>
                                            <p className="text-gray-500">
                                                Try adjusting your search terms.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent>

                                {/* TAB: ABOUT */}
                                <TabsContent value="about">
                                    <Card className="border-none shadow-md">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">
                                                About {reporter.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="prose prose-orange prose-lg max-w-none leading-relaxed text-gray-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: reporter.present,
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
