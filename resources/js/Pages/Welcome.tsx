import { Button } from '@/components/ui/button';
import AboutImage from '@/images/about.jpg';
import Bg from '@/images/segbohero.png';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    FileText,
    Sparkles,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Reporter = {
    name: string;
    username: string;
    pub: number;
    photo: string;
};

interface Props extends PageProps {
    topReporters: Reporter[];
}

const stats = [
    { icon: Users, value: '10K+', label: 'Active Journalists' },
    { icon: FileText, value: '50K+', label: 'Stories Published' },
    { icon: TrendingUp, value: '2M+', label: 'Monthly Readers' },
];

const features = [
    {
        title: 'Instant Global Reach',
        desc: 'Publish your investigative stories and compelling narratives in seconds to a global audience.',
    },
    {
        title: 'Professional Profile & Credibility',
        desc: 'Showcase your expertise with a dedicated professional bio and seamlessly link your social media to build trust.',
    },
    {
        title: 'Audience Leveraging',
        desc: "Amplify your personal brand by seamlessly driving Segbon's high-traffic readers to your external channels and website.",
    },
    {
        title: 'Connect & Collaborate',
        desc: 'Join a thriving community to network, share insights, and collaborate with other independent journalists globally.',
    },
];

export default function Welcome() {
    const { topReporters } = usePage<Props>().props;
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: { clientX: number; clientY: number }) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <GuestLayout>
            <Head title="Home" />
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100">
                {/* Hero Section avec effet parallaxe */}
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                    {/* Animated background gradients */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `radial-gradient(circle at ${mousePosition.x / 10}px ${mousePosition.y / 10}px, #f97316 0%, transparent 50%)`,
                        }}
                    />

                    {/* Floating shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute h-96 w-96 animate-pulse rounded-full bg-orange-300 opacity-20 blur-3xl"
                            style={{
                                top: '10%',
                                left: '5%',
                                transform: `translateY(${scrollY * 0.3}px)`,
                            }}
                        />
                        <div
                            className="absolute h-96 w-96 animate-pulse rounded-full bg-blue-300 opacity-20 blur-3xl"
                            style={{
                                bottom: '10%',
                                right: '5%',
                                animationDelay: '1s',
                                transform: `translateY(${-scrollY * 0.2}px)`,
                            }}
                        />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-8 inline-flex animate-bounce items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Join best storytellers worldwide
                            </span>
                        </div>

                        <h1 className="mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                            <span className="animate-gradient bg-300% bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Empower Your Stories
                            </span>
                            <br />
                            <span className="text-gray-900">
                                Amplify Your Voice
                            </span>
                        </h1>

                        <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 sm:text-2xl">
                            The premier platform for independent journalists to
                            publish, connect, and inspire millions
                        </p>

                        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="group transform rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-6 text-lg text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-orange-700 hover:to-orange-600 hover:shadow-2xl"
                            >
                                <a
                                    href={route('register')}
                                    className="flex items-center gap-2"
                                >
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="group rounded-full border-2 border-gray-300 px-8 py-6 text-lg hover:border-orange-500"
                            >
                                <a href={route('find.article')}>
                                    Explore Stories
                                </a>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="transform rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <stat.icon className="mx-auto mb-3 h-8 w-8 text-orange-600" />
                                    <div className="mb-1 text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="h-10 w-6 rounded-full border-2 border-gray-400 p-1">
                            <div className="mx-auto h-3 w-1.5 animate-pulse rounded-full bg-gray-400" />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                                Everything You Need to{' '}
                                <span className="text-orange-600">Succeed</span>
                            </h2>
                            <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                Professional tools designed for modern
                                storytellers
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group transform rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-orange-300 hover:shadow-2xl"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 transition-transform group-hover:scale-110">
                                        <Check className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-600">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section - Redesigned */}
                <section className="relative overflow-hidden bg-gradient-to-br from-white to-orange-50 py-24">
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, #000 1px, transparent 1px)',
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Image with overlay effects */}
                            <div className="group relative">
                                <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 transition-transform duration-300 group-hover:rotate-6" />
                                <img
                                    src={AboutImage}
                                    alt="Journalists working"
                                    className="relative h-[500px] w-full -rotate-3 transform rounded-3xl object-cover shadow-2xl transition-transform duration-300 group-hover:-rotate-6"
                                />
                                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-6 shadow-xl">
                                    <div className="text-4xl font-bold text-orange-600">
                                        10K+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Stories Published
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                                    About{' '}
                                    <span className="text-orange-600">
                                        Segbon
                                    </span>
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    We're building the future of independent
                                    journalism. A platform where your stories
                                    matter, your voice is heard, and your work
                                    reaches millions.
                                </p>
                                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                    Whether you're breaking news, crafting
                                    investigative pieces, or sharing compelling
                                    narratives, Segbon provides the tools and
                                    community to amplify your impact.
                                </p>

                                {/* Steps */}
                                <div className="mb-8 space-y-4">
                                    {[
                                        'Create your Segbon account in 30 seconds',
                                        'Build your professional profile',
                                        'Publish and reach millions',
                                    ].map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-start gap-4"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 font-bold text-white transition-transform group-hover:scale-110">
                                                {idx + 1}
                                            </div>
                                            <p className="pt-1.5 text-lg text-gray-700">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    size="lg"
                                    className="group rounded-full bg-orange-600 px-8 py-6 text-lg text-white shadow-xl hover:bg-orange-700"
                                    asChild
                                >
                                    <a href={route('register')}>
                                        Become Segbon
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top Reporters Section */}
                <section className="px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                                Meet Our Top{' '}
                                <span className="text-orange-600">
                                    Storytellers
                                </span>
                            </h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                                Discover talented journalists and their
                                exceptional work
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-2 border-orange-600 px-8 text-orange-600 hover:bg-orange-50"
                            >
                                <a
                                    href={route('find.reporter')}
                                    className="flex items-center gap-2"
                                >
                                    View All Journalists
                                    <ArrowRight className="ml-auto h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* NEW DESIGN GRID (from your first snippet) */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {topReporters.map((reporter, idx) => (
                                <div
                                    key={idx}
                                    className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    {/* Content */}
                                    <div className="p-8 text-center">
                                        {/* Photo */}
                                        <div className="relative mx-auto mb-6 h-32 w-32">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>

                                            <img
                                                src={reporter.photo}
                                                alt={reporter.name}
                                                className="relative h-full w-full rounded-full object-cover shadow-xl ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:ring-orange-400"
                                            />

                                            {/* Floating Badge = number of pubs */}
                                            <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 p-2.5 shadow-lg">
                                                <div className="flex items-center gap-1 text-white">
                                                    <Star className="h-3.5 w-3.5" />
                                                    <span className="text-xs font-bold">
                                                        {reporter.pub}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                                            {reporter.name}
                                        </h3>
                                        <p className="mb-6 text-sm font-medium text-gray-500">
                                            @{reporter.username}
                                        </p>

                                        {/* Button */}
                                        <button className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40">
                                            <a
                                                href={route('find.more', {
                                                    username: reporter.username,
                                                })}
                                                className="flex items-center gap-3"
                                            >
                                                View Profile
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600" />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url(${Bg})`,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                            Ready to Share Your Story?
                        </h2>
                        <p className="mb-12 text-xl text-orange-100">
                            Join thousands of journalists who trust Segbon to
                            amplify their voice
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="transform rounded-full bg-white px-8 py-6 text-lg text-orange-600 shadow-2xl transition-all hover:scale-105 hover:bg-gray-100"
                            >
                                <a href={route('register')}>
                                    Create Free Account
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-2 border-white px-8 py-6 text-lg text-black hover:bg-white/10"
                            >
                                <a href={route('about')}>Learn More</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* <style>{`
                    @keyframes gradient {
                        0%,
                        100% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                    }
                    .animate-gradient {
                        animation: gradient 3s ease infinite;
                    }
                    .bg-300\% {
                        background-size: 300%;
                    }
                `}</style> */}
            </div>
        </GuestLayout>
    );
}
