import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={clsx('py-4 flex items-center gap-2 px-2 border-l-4 font-medium leading-5 transition duration-150 ease-in-out focus:outline-none', {
                'border-indigo-500 text-gray-900 focus:border-indigo-700 text-indigo-500 font-bold': active
            },
            {
                'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ': !active
            }) +className
        }
        >
            {children}
        </Link>
    );
}
