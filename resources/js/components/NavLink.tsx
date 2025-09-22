import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-orange-600 text-white focus:border-orange-600'
                    : 'border-transparent text-white hover:border-orange-600 hover:text-orange-600 focus:border-orange-600 focus:text-orange-600') +
                className
            }
        >
            {children}
        </Link>
    );
}
