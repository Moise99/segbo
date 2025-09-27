import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AboutImage from '@/images/authimage.jpg';
import Hero from '@/images/segbohero.png';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

type Reporter = {
    name: string;
    username: string;
    pub: number;
    photo: string;
};

interface Props extends PageProps {
    topReporters: Reporter[];
}

export default function Welcome() {
    const { topReporters } = usePage<Props>().props;

    return (
        <GuestLayout>
            <Head title="Home" />
            <section
                className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${Hero})` }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Hero Content */}
                <div className="relative z-10 px-4 text-center text-white sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        Empower Your Stories, Amplify Your Voice
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
                        Join a community of journalists, reporters, and authors
                        to share your work and inspire the world.
                    </p>
                    <a
                        href={route('register')}
                        className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-900"
                    >
                        Register Now
                    </a>
                </div>
            </section>
            <div className="bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 lg:flex-row">
                        {/* Image Section */}
                        <div className="lg:w-1/2">
                            <img
                                src={AboutImage}
                                alt="Journalist working on a story"
                                className="h-auto w-full rounded-lg object-cover shadow-2xl"
                            />
                        </div>
                        {/* About Text Section */}
                        <div className="p-6 lg:w-1/2">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                About Segbo
                            </h2>
                            <p className="mb-4 text-lg text-gray-700">
                                Our platform is dedicated to journalists,
                                reporters, and authors who are passionate about
                                storytelling. Whether you're uncovering breaking
                                news, crafting in-depth investigative pieces, or
                                writing compelling narratives, we provide the
                                tools and community to elevate your work.
                            </p>
                            <p className="text-lg text-gray-700">
                                Join us to connect with like-minded
                                professionals, share your stories, and reach a
                                global audience. Your voice matters, and we're
                                here to help it resonate.
                            </p>
                            <p className="my-2 text-lg text-gray-700">
                                Follow these steps:
                            </p>
                            <ul className="list-inside list-disc text-lg text-gray-700">
                                <li>
                                    <a
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-900"
                                    >
                                        Create your Segbo account
                                    </a>
                                </li>
                                <li>Fill out your profile</li>
                                <li>And publish</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 text-center">
                <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-4xl">
                    Our Top Segbo
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    <Link href={route('find.reporter')} className="mb-8">
                        <Button
                            variant="default"
                            className="bg-orange-600 text-white"
                        >
                            Discover our talented journalists and their areas of
                            expertise
                        </Button>
                    </Link>
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 px-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {topReporters.length > 0 ? (
                    topReporters.map((reporter, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                        >
                            {/* Reporter Photo */}
                            <div className="relative h-48">
                                <img
                                    src={reporter.photo}
                                    alt={reporter.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Reporter Infos */}
                            <CardContent className="flex flex-col gap-3 p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {reporter.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    @{reporter.username}
                                </p>

                                {/* Link to a specific reporter's page */}
                                <div className="mt-4">
                                    <Button
                                        variant="default"
                                        className="w-full rounded-xl bg-orange-600"
                                        onClick={() =>
                                            router.get(
                                                `/segbo/${reporter.username}`,
                                            )
                                        }
                                    >
                                        See more
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-gray-500">
                        Not found
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
