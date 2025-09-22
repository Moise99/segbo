import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Welcome" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
