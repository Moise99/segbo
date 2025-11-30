import ApplicationLogo from '@/components/ApplicationLogo';
import NavLink from '@/components/NavLink';
import { Link } from '@inertiajs/react';

export default function SgFooter() {
    return (
        <footer className="bg-gradient-to-l from-blue-800 to-[#010336] py-8 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="mb-4">
                            <ApplicationLogo className="h-10 w-auto fill-current text-white transition-transform duration-300 hover:scale-105" />
                        </Link>
                        <p className="text-center text-sm text-gray-300 md:text-left">
                            Connecting you with the best authors, creators and
                            publications.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <NavLink
                            href={route('privacy.policy')}
                            active={route().current('privacy.policy')}
                            className="mb-2 text-sm text-gray-300 transition-colors hover:text-orange-600"
                        >
                            Privacy policy
                        </NavLink>
                        <NavLink
                            href={route('terms.of.use')}
                            active={route().current('terms.of.use')}
                            className="mb-2 text-sm text-gray-300 transition-colors hover:text-orange-600"
                        >
                            Terms of use
                        </NavLink>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="mb-4 text-lg font-semibold">
                            Contact Us
                        </h3>
                        <p className="mb-2 text-sm text-gray-300">
                            Email: support@segbon.com
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm text-gray-300">
                        &copy; {new Date().getFullYear()} Segbon. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
