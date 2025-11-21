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
    LucideIcon,
    Newspaper,
    PenTool,
    Share2,
    User,
    Users,
} from 'lucide-react';

// --- Feature Card Component (Modularizing the "Why Segbon" list items) ---
interface FeatureCardProps {
    icon: LucideIcon;
    text: string;
}

const FeatureCard = ({ icon: Icon, text }: FeatureCardProps) => (
    // Card for a defined, interactive feature box
    <Card className="flex items-start gap-4 p-4 transition-shadow hover:shadow-lg">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Icon className="h-5 w-5" />
        </div>
        <CardContent className="p-0 pt-1">
            <p className="text-lg font-medium text-gray-700">{text}</p>
        </CardContent>
    </Card>
);

export default function About() {
    // Data structure for the features list
    const features = [
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
    ];

    // Data structure for the "How It Works" steps
    const steps = [
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
    ];

    return (
        <GuestLayout>
            <Head title="About" />

            {/* Hero Section - High-impact gradient background with cleaner overlay */}
            <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-orange-600 to-blue-800 text-white">
                {/* Visual overlay for contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        Your Voice Deserves to Be Heard
                    </h1>
                    <p className="mx-auto mb-10 max-w-3xl text-lg text-orange-100 sm:text-xl">
                        Segbon is the platform built for{' '}
                        <strong className="text-white">
                            independent journalists, reporters, and authors{' '}
                        </strong>
                        to showcase their work, grow their audience, and stay
                        connected with readers, all in one place.
                    </p>
                    {/* Primary CTA (Optional in Hero, but good practice) */}
                    <Link href={route('register')}>
                        <Button
                            size="lg"
                            className="bg-white text-orange-600 hover:bg-gray-100/90"
                        >
                            <User className="mr-2 h-5 w-5" />
                            Start Publishing
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Mission & Vision / Why Segbon? Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Mission & Vision Column */}
                        <div>
                            <Badge
                                variant="outline"
                                className="mb-4 border-orange-200 bg-orange-50 text-sm font-semibold text-orange-600"
                            >
                                FOUNDATION
                            </Badge>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Our Mission
                            </h2>
                            <p className="mb-4 text-xl leading-relaxed text-gray-700">
                                To empower{' '}
                                <strong className="font-semibold text-gray-900">
                                    independent journalists, reporters and
                                    authors
                                </strong>{' '}
                                with a professional and powerful space to
                                centralize their work.
                            </p>
                            <p className="text-xl leading-relaxed text-gray-700">
                                Every story matters. Every voice deserves an
                                audience. We are here to make that connection
                                real.
                            </p>
                        </div>

                        {/* Why Segbon? Column (Uses FeatureCard component) */}
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Why Segbon?
                            </h2>
                            <div className="space-y-4">
                                {features.map((item, i) => (
                                    <FeatureCard
                                        key={i}
                                        icon={item.icon}
                                        text={item.text}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative Separator */}
            <Separator className="mx-auto my-10 max-w-7xl" />

            {/* How It Works Section */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Badge
                            variant="default"
                            className="mb-4 bg-blue-600 hover:bg-blue-700"
                        >
                            3 SIMPLE STEPS
                        </Badge>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            From shadow to spotlight in just 3 steps.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-3">
                        {steps.map((step, i) => (
                            <Card
                                key={i}
                                className="text-center transition-transform duration-300 hover:shadow-xl"
                            >
                                <CardHeader className="flex flex-col items-center">
                                    {/* Step Number Badge */}
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-500 bg-orange-600 text-2xl font-extrabold text-white shadow-lg">
                                        {step.step}
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        {step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <CardDescription className="text-base text-gray-600">
                                        {step.desc}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Readers Section */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        {/* Image Column */}
                        <div className="lg:w-1/2">
                            <img
                                src={AboutImage}
                                alt="Reader following Segbon"
                                className="h-auto w-full rounded-xl border-4 border-white object-cover shadow-2xl"
                            />
                            {/* <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-gray-200 text-gray-500 shadow-2xl">
                                [Image of a person reading on a tablet or phone]
                            </div> */}
                        </div>

                        {/* Content Column */}
                        <div className="lg:w-1/2">
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                                For Readers: Never Miss a Story
                            </h2>
                            <p className="mb-4 text-xl leading-relaxed text-gray-700">
                                Follow your{' '}
                                <strong className="font-semibold text-gray-900">
                                    favorite journalists / reporters / authors
                                </strong>{' '}
                                with one click. Get notified the moment they
                                publish no matter where.
                            </p>
                            <ul className="mb-8 space-y-4 text-lg text-gray-700">
                                <li className="flex items-center gap-3">
                                    <Badge
                                        variant="default" // Using default variant for better visibility
                                        className="bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Free
                                    </Badge>
                                    No ads, no paywalls
                                </li>
                                <li className="flex items-center gap-3">
                                    <Badge
                                        variant="default"
                                        className="bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Instant
                                    </Badge>
                                    Alerts as soon as it’s live
                                </li>
                                <li className="flex items-center gap-3">
                                    <Badge
                                        variant="default"
                                        className="bg-purple-600 text-white hover:bg-purple-700"
                                    >
                                        Centralized
                                    </Badge>
                                    All your writers in one feed
                                </li>
                            </ul>
                            <Link href={route('find.reporter')}>
                                <Button
                                    size="lg"
                                    className="bg-orange-600 shadow-lg hover:bg-orange-700"
                                >
                                    <Newspaper className="mr-2 h-5 w-5" />
                                    Discover Segbon Reporters
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA - Consistent gradient and fixed button styles */}
            <section className="bg-gradient-to-r from-orange-600 to-blue-900 py-20 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                        Ready to Amplify Your Voice?
                    </h2>
                    <p className="mb-10 text-xl text-orange-100">
                        Join hundreds of independent journalists, reporters, and
                        authors already using Segbon to grow their reach.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        {/* Primary Button: White BG, Orange Text */}
                        <Link href={route('register')}>
                            <Button
                                size="lg"
                                className="bg-white text-orange-600 shadow-lg hover:bg-gray-100/90 hover:text-orange-700"
                            >
                                <User className="mr-2 h-5 w-5" />
                                Become a Segbon
                            </Button>
                        </Link>
                        {/* Secondary Button: Outline (White border/text, Blue hover) - FIXED STYLES */}
                        <Link href={route('find.reporter')}>
                            <Button
                                size="lg"
                                variant="outline"
                                // Fixed styles for hover and border
                                className="border-2 border-white bg-transparent text-white hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                            >
                                Explore Segbons
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
