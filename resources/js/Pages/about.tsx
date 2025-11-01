import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AboutImage from '@/images/authimage.jpg';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Bell,
    Globe,
    Newspaper,
    PenTool,
    Share2,
    User,
    Users,
} from 'lucide-react';

export default function About() {
    return (
        <GuestLayout>
            <Head title="About" />

            {/* Hero Section */}
            <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-orange-600 to-blue-900 text-white">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        Your Voice Deserves to Be Heard
                    </h1>
                    <p className="mx-auto mb-8 max-w-3xl text-lg sm:text-xl">
                        Segbon is the platform built for{' '}
                        <strong>
                            independent journalists, reporters, and authors{' '}
                        </strong>
                        to showcase their work, grow their audience, and stay
                        connected with readers, all in one place.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                Our Mission
                            </h2>
                            <p className="mb-4 text-lg text-gray-700">
                                To empower{' '}
                                <strong>
                                    independent journalists, reporters and
                                    authors
                                </strong>{' '}
                                with a professional and powerful space to
                                centralize their work
                            </p>
                            <p className="text-lg text-gray-700">
                                Every story matters. Every voice deserves an
                                audience. We are here to make that connection
                                real.
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                Why Segbon?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: PenTool,
                                        text: 'Professional portfolio in minutes',
                                    },
                                    {
                                        icon: Globe,
                                        text: 'Link to your articles anywhere (News websites, blogs...)',
                                    },
                                    {
                                        icon: Bell,
                                        text: 'Instant push/email alerts to your followers',
                                    },
                                    {
                                        icon: Users,
                                        text: 'Build a loyal, engaged community',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-lg text-gray-700">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="my-12" />

            {/* How It Works */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                            How It Works
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            From shadow to spotlight in just 3 steps.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-3">
                        {[
                            {
                                step: '1',
                                title: 'Create Your Profile',
                                desc: 'Sign up for free and add your bio, photo, and areas of expertise.',
                                icon: Users,
                            },
                            {
                                step: '2',
                                title: 'Add Your Publications',
                                desc: 'Paste any article / Video link.',
                                icon: Share2,
                            },
                            {
                                step: '3',
                                title: 'Notify Your Readers',
                                desc: 'Every new link triggers instant alerts to your followers.',
                                icon: Bell,
                            },
                        ].map((step, i) => (
                            <Card
                                key={i}
                                className="text-center transition-transform hover:scale-105"
                            >
                                <CardHeader>
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-2xl font-bold text-white">
                                        {step.step}
                                    </div>
                                    <CardTitle>{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-gray-600">
                                        {step.desc}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Readers */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 lg:flex-row">
                        <div className="lg:w-1/2">
                            <img
                                src={AboutImage}
                                alt="Reader following Segbon"
                                className="h-auto w-full rounded-xl object-cover shadow-2xl"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                For Readers: Never Miss a Story
                            </h2>
                            <p className="mb-4 text-lg text-gray-700">
                                Follow your{' '}
                                <strong>
                                    favorite journalists / reporters / authors
                                </strong>{' '}
                                with one click. Get notified the moment they
                                publish no matter where.
                            </p>
                            <ul className="mb-6 space-y-3 text-lg text-gray-700">
                                <li className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-800"
                                    >
                                        Free
                                    </Badge>
                                    No ads, no paywalls
                                </li>
                                <li className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="bg-blue-100 text-blue-800"
                                    >
                                        Instant
                                    </Badge>
                                    Alerts as soon as it’s live
                                </li>
                                <li className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="bg-purple-100 text-purple-800"
                                    >
                                        Centralized
                                    </Badge>
                                    All your writers in one feed
                                </li>
                            </ul>
                            <Link href={route('find.reporter')}>
                                <Button
                                    size="lg"
                                    className="bg-orange-600 hover:bg-orange-700"
                                >
                                    <Newspaper className="mr-2 h-5 w-5" />
                                    Discover Segbon
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-orange-600 to-blue-900 py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                        Ready to Amplify Your Voice?
                    </h2>
                    <p className="mb-8 text-lg">
                        Join hundreds of independent journalists, reporters, and
                        authors already using Segbon to grow their reach.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link href={route('register')}>
                            <Button
                                size="lg"
                                className="bg-white text-orange-600 hover:border-orange-600 hover:bg-blue-800"
                            >
                                <User className="mr-2 h-5 w-5" />
                                Become Segbon
                            </Button>
                        </Link>
                        <Link href={route('find.reporter')}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="hover:text-organge-600 border-white text-orange-600 hover:border-blue-800 hover:bg-blue-800"
                            >
                                Explore Segbon
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
