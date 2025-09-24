import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-orange-600 bg-orange-600 text-white focus:border-orange-600 focus:bg-orange-600 focus:text-orange-600'
                    : 'border-transparent text-white hover:border-orange-600 hover:bg-gray-600 hover:text-orange-600 focus:border-orange-600 focus:bg-gray-600 focus:text-orange-600'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
