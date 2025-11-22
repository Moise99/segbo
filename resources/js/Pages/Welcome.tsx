import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// --- TYPES ---
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
        title: 'Pro Profile & Credibility',
        desc: 'Showcase your expertise with a dedicated professional bio and seamlessly link your social media.',
    },
    {
        title: 'Audience Leveraging',
        desc: "Amplify your personal brand by seamlessly driving Segbon's high-traffic readers to your channels.",
    },
    {
        title: 'Connect & Collaborate',
        desc: 'Join a thriving community to network, share insights, and collaborate with other journalists.',
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
            <div className="min-h-screen overflow-hidden bg-slate-50">
                {/* HERO SECTION */}
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 lg:pt-0">
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-80" />

                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-400/20 blur-[100px]"
                            style={{
                                transform: `translateY(${scrollY * 0.2}px)`,
                            }}
                        />
                        <div
                            className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[100px]"
                            style={{
                                transform: `translateY(${-scrollY * 0.2}px)`,
                            }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <Badge
                            variant="secondary"
                            className="mb-8 animate-bounce px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm"
                        >
                            <Sparkles className="mr-2 h-4 w-4 text-orange-600" />
                            Join the best storytellers worldwide
                        </Badge>

                        <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                            Empower Your Stories <br />
                            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                                Amplify Your Voice
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl">
                            The premier platform for independent journalists to
                            publish, connect, and inspire millions of readers
                            globally.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-orange-600 px-8 text-lg shadow-xl hover:bg-orange-700 hover:shadow-2xl hover:shadow-orange-500/20"
                            >
                                <a
                                    href={route('register')}
                                    className="flex items-center"
                                >
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 rounded-full border-2 px-8 text-lg hover:bg-slate-50"
                            >
                                <a href={route('find.article')}>
                                    Explore Stories
                                </a>
                            </Button>
                        </div>

                        {/* Stats Cards - Utilisation de Shadcn Card */}
                        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {stats.map((stat, idx) => (
                                <Card
                                    key={idx}
                                    className="border-none bg-white/60 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <CardContent className="flex flex-col items-center p-6">
                                        <div className="mb-4 rounded-full bg-orange-100 p-3">
                                            <stat.icon className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-medium text-slate-500">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Everything You Need to{' '}
                                <span className="text-orange-600">Succeed</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Professional tools designed specifically for
                                modern storytellers.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, idx) => (
                                <Card
                                    key={idx}
                                    className="group border-slate-100 transition-all hover:border-orange-200 hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md transition-transform group-hover:scale-110">
                                            <Check className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500">
                                            {feature.desc}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Top Reporters Section */}
                <section className="bg-slate-900 py-24 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold sm:text-4xl">
                                    Top Storytellers
                                </h2>
                                <p className="mt-2 text-slate-400">
                                    Discover the voices shaping the narrative.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                className="mt-4 md:mt-0"
                                asChild
                            >
                                <a href={route('find.reporter')}>
                                    View All Journalists
                                </a>
                            </Button>
                        </div>

                        {/* --- GRILLE 4 COLONNES --- */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {topReporters.map((reporter, idx) => (
                                <div key={idx} className="group">
                                    <Card className="relative h-full overflow-hidden border-none bg-slate-800 text-slate-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
                                        {/* Decorative Banner */}
                                        <div className="h-32 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-orange-600 opacity-90 transition-opacity group-hover:opacity-100">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                                        </div>

                                        {/* Avatar */}
                                        <div className="absolute left-1/2 top-20 -translate-x-1/2 transform">
                                            <Avatar className="h-24 w-24 border-4 border-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-slate-700">
                                                <AvatarImage
                                                    src={reporter.photo}
                                                    alt={reporter.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-slate-700 text-2xl font-bold text-white">
                                                    {reporter.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Publication Badge */}
                                            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 transform">
                                                <Badge className="flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] text-white shadow-lg ring-2 ring-slate-800">
                                                    <TrendingUp className="h-3.5 w-3.5" />
                                                    {reporter.pub}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <CardContent className="pb-6 pt-16 text-center">
                                            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-orange-400">
                                                {reporter.name}
                                            </h3>
                                            <p className="mb-4 text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-300">
                                                @{reporter.username}
                                            </p>

                                            <Button
                                                className="w-full rounded-full bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-orange-400"
                                                asChild
                                            >
                                                <a
                                                    href={route('find.more', {
                                                        username:
                                                            reporter.username,
                                                    })}
                                                >
                                                    View Profile
                                                </a>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ABOUT SECTION (Cleaned up) */}
                <section className="relative overflow-hidden py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute inset-0 -rotate-6 rounded-3xl bg-orange-200" />
                                <img
                                    src={AboutImage}
                                    alt="Journalists working"
                                    className="relative rotate-3 rounded-3xl object-cover shadow-2xl transition-transform hover:rotate-0"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="mb-6 text-3xl font-bold text-slate-900 sm:text-4xl">
                                    About{' '}
                                    <span className="text-orange-600">
                                        Segbon
                                    </span>
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-slate-600">
                                    We're building the future of independent
                                    journalism. A platform where your stories
                                    matter, your voice is heard, and your work
                                    reaches millions.
                                </p>

                                <ul className="mb-8 space-y-6">
                                    {[
                                        'Create your Segbon account in 30 seconds',
                                        'Build your professional profile',
                                        'Publish and reach millions',
                                    ].map((step, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-4"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                                                {idx + 1}
                                            </span>
                                            <span className="pt-1 text-lg font-medium text-slate-700">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    size="lg"
                                    className="rounded-full bg-slate-900 px-8 text-lg hover:bg-slate-800"
                                    asChild
                                >
                                    <a href={route('register')}>
                                        Become a Segbon
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="relative overflow-hidden bg-orange-600 py-24">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url(${Bg})`,
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                            Ready to Share Your Story?
                        </h2>
                        <p className="mb-10 text-xl text-orange-100">
                            Join thousands of journalists who trust Segbon to
                            amplify their voice.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-white px-8 text-lg text-orange-600 hover:bg-orange-50"
                                asChild
                            >
                                <a href={route('register')}>
                                    Create Free Account
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 rounded-full border-white bg-transparent px-8 text-lg text-white hover:bg-white/10 hover:text-white"
                                asChild
                            >
                                <a href={route('about')}>Learn More</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
