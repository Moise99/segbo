import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <nav className="border-b border-gray-100 bg-gradient-to-l from-blue-800 to-[#010336]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('element.list')}
                                    active={
                                        route().current('element.list') ||
                                        route().current('element.create') ||
                                        route().current('element.edit')
                                    }
                                >
                                    Publications
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-orange-600 transition duration-150 ease-in-out hover:text-orange-600 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Account
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('acdetail.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('element.list')}
                            active={
                                route().current('element.list') ||
                                route().current('element.create') ||
                                route().current('element.edit')
                            }
                        >
                            Publications
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-orange-600">
                                {user.name}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Account
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow">{children}</main>

            <footer className="bg-gradient-to-l from-blue-800 to-[#010336] py-8 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center md:items-start">
                            <Link href="/" className="mb-4">
                                <ApplicationLogo className="h-10 w-auto fill-current text-white transition-transform duration-300 hover:scale-105" />
                            </Link>
                            <p className="text-center text-sm text-gray-300 md:text-left">
                                Connecting you with the best reporters and
                                publications.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="mb-4 text-lg font-semibold">
                                Quick Links
                            </h3>
                            <NavLink
                                href={route('find.reporter')}
                                active={
                                    route().current('find.reporter') ||
                                    route().current('find.more')
                                }
                                className="mb-2 text-sm text-gray-300 transition-colors hover:text-orange-600"
                            >
                                Find Reporter
                            </NavLink>
                            <NavLink
                                href={route('find.article')}
                                active={
                                    route().current('find.article') ||
                                    route().current('find.pubmore')
                                }
                                className="mb-2 text-sm text-gray-300 transition-colors hover:text-orange-600"
                            >
                                Publications
                            </NavLink>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="mb-4 text-lg font-semibold">
                                Contact Us
                            </h3>
                            <p className="mb-2 text-sm text-gray-300">
                                Email: support@segbo.com
                            </p>
                            <p className="text-sm text-gray-300">
                                Phone: +1 (123) 456-7890
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-600 pt-4 text-center">
                        <p className="text-sm text-gray-300">
                            &copy; {new Date().getFullYear()} Segbo. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
