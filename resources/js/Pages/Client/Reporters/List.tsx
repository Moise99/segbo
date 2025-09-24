// src/Pages/Client/Reporters/Details.tsx

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assurez-vous d'avoir un composant d'Input
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react'; // Importez useState et useMemo

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

export default function Reporters() {
    const { reporters } = usePage<Props>().props;
    const total_reporters = reporters.length;

    // 1. Search state
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Filter logic with useMemo
    const filteredReporters = useMemo(() => {
        if (!searchTerm) {
            return reporters; // no filter, return all reporter
        }

        const lowercasedSearchTerm = searchTerm.toLowerCase();

        return reporters.filter((reporter) => {
            // Search by name and username
            const nameMatch = reporter.name
                .toLowerCase()
                .includes(lowercasedSearchTerm);
            const usernameMatch = reporter.username
                .toLowerCase()
                .includes(lowercasedSearchTerm);

            // Search in categories
            const categoryMatch = reporter.categories.some((cat) =>
                cat.name.toLowerCase().includes(lowercasedSearchTerm),
            );

            // Search by publication count (convert in string to search)
            const countMatch = reporter.categories.some((cat) =>
                String(cat.count).includes(lowercasedSearchTerm),
            );

            // Renvoyer true if one of these condition is true
            return nameMatch || usernameMatch || categoryMatch || countMatch;
        });
    }, [reporters, searchTerm]);

    return (
        <GuestLayout>
            <Head title="Reporters" />
            <div className="mb-8 text-center">
                <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Our {total_reporters} Segbo
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Discover our talented journalists and their areas of
                    expertise
                </p>
            </div>

            {/* search bar */}
            <div className="mx-auto my-8 max-w-lg px-2 sm:px-4">
                <Input
                    type="text"
                    placeholder="Search for a reporter by name, username, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white"
                />
            </div>

            <div className="grid grid-cols-1 gap-12 px-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredReporters.length > 0 ? (
                    filteredReporters.map((reporter, index) => (
                        <Card
                            key={index}
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
