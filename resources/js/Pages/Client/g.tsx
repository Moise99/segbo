// src/Pages/Client/Reporters/Details.tsx

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Type definitions for the data
type Category = {
    name: string;
    count: number;
};

type Reporter = {
    name: string;
    username: string;
    photo: string | null;
    categories: Category[];
};

interface Props extends PageProps {
    reporters: Reporter[];
}

export default function ReportersDetails() {
    const { reporters } = usePage<Props>().props;

    return (
        <GuestLayout>
            <Head title="Nos Segbo" />
            <div className="mb-8 text-center">
                <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Nos Journalistes
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Découvrez nos journalistes talentueux et leurs domaines
                    d'expertise.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {reporters.length > 0 ? (
                    reporters.map((reporter, index) => (
                        <Card
                            key={index} // It's better to use a unique ID if available, like reporter.id
                            className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                        >
                            {/* Reporter Photo */}
                            <div className="relative h-48">
                                <img
                                    src={
                                        reporter.photo
                                            ? `/storage/${reporter.photo}`
                                            : '/storage/becomesegbo_images/default.png'
                                    }
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

                                {/* Top 3 Categories */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {reporter.categories.map(
                                        (cat, catIndex) => (
                                            <span
                                                key={catIndex}
                                                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                                            >
                                                {cat.name} ({cat.count})
                                            </span>
                                        ),
                                    )}
                                </div>

                                {/* Link to a specific reporter's page if available */}
                                {/* You would need a separate route and controller for this */}
                                <div className="mt-4">
                                    <Link
                                        href={`/reporters/${reporter.username}`}
                                    >
                                        <Button className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                                            Voir le profil
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-gray-500">
                        Aucun journaliste trouvé.
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
