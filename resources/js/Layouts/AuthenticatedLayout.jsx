import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Base } from './Layout';
import { IconUser, IconBook, IconSchool, IconFileCertificate, IconHome, IconLogout } from '@tabler/icons-react';


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
    <Base>
        <div className="h-full grid grid-cols-[1.2fr_3fr] bg-transparent gap-2">
            <nav className="bg-gray-800 rounded-xl py-8 flex flex-col max-h-full">
                <Link href="/" className='flex justify-center mb-8'>
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-400" />
                </Link>
                <NavLink active={route().current('profile.edit')} href={route('profile.edit')}>
                    <IconUser></IconUser>
                    <span>
                        {user.name}
                    </span>
                </NavLink>
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <IconBook></IconBook>
                    <span>
                        Soutenir
                    </span>
                </NavLink>
                <NavLink href={route('etudiant')} active={route().current('etudiant')}>
                    <IconFileCertificate></IconFileCertificate>
                    <span>
                        Etudiant
                    </span>
                </NavLink>
                <NavLink href={route('professeur')} active={route().current('professeur')}>
                    <IconSchool></IconSchool>
                    <span>
                        Professeur
                    </span>
                </NavLink>
                <NavLink href={route('organisme')} active={route().current('organisme')}>
                    <IconHome></IconHome>
                    <span>
                        Organisme
                    </span>
                </NavLink>
                <Link href={route('logout')} method='POST' as='button' className='hover:bg-gray-700 py-4 px-4 text-start text-red-500 flex items-center gap-2 mt-auto'>
                    <IconLogout></IconLogout>
                    <span>
                        Déconnecter
                    </span>
                </Link>
            </nav>

            {/*header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )*/}

            <main className='bg-gray-800 rounded-xl max-h-[95vh] overflow-scroll'>
                {children}
            </main>
        </div>
    </Base>
    );
}
