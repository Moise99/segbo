import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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
    return (
        <GuestLayout>
            <Head title="Reporters" />
            <div className="mb-8 text-center">
                <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Nos Reporters
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Découvrez nos journalistes talentueux et leurs domaines
                    d'expertise
                </p>
            </div>
            <div className="grid grid-cols-1 gap-12 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {reporters.map((reporter) => (
                    // <Card
                    //     key={reporter.user_id}
                    //     className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                    // >
                    //     {/* Header Image - Carrée */}
                    //     <div className="aspect-square w-full flex-shrink-0 bg-gray-100">
                    //         <img
                    //             src={
                    //                 reporter.photo
                    //                     ? `/storage/${reporter.photo}`
                    //                     : '/storage/becomesegbo_images/default.png'
                    //             }
                    //             alt={reporter.name}
                    //             className="h-full w-full object-cover"
                    //         />
                    //     </div>

                    //     {/* Infos */}
                    //     <CardContent className="flex flex-grow flex-col gap-3 p-4">
                    //         <div className="flex-shrink-0">
                    //             <h2 className="text-lg font-semibold text-gray-800">
                    //                 {reporter.name}
                    //             </h2>
                    //             <p className="text-sm text-gray-500">
                    //                 @{reporter.username}
                    //             </p>
                    //         </div>

                    //         {/* Catégories */}
                    //         <div className="flex flex-grow flex-wrap gap-2 content-start">
                    //             {reporter.categories.map((cat, index) => (
                    //                 <span
                    //                     key={index}
                    //                     className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-700"
                    //                 >
                    //                     {cat.name} ({cat.count})
                    //                 </span>
                    //             ))}
                    //         </div>

                    //         {/* Bouton */}
                    //         <div className="mt-auto flex-shrink-0 pt-3">
                    //             <Button className="w-full rounded-xl bg-orange-600 text-white hover:bg-orange-700">
                    //                 See more
                    //             </Button>
                    //         </div>
                    //     </CardContent>
                    // </Card>
                ))}
            </div>
        </GuestLayout>
    );
}
