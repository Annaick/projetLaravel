import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { Base } from './Layout';
import { IconUser, IconBook, IconSchool, IconFileCertificate, IconHome, IconLogout, IconCube } from '@tabler/icons-react';
import './style.css'

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
    <Base>
        <div className="h-full grid grid-cols-[1.2fr_3fr] bg-transparent gap-2">
            <nav className="bg-gray-800/90 backdrop-blur rounded-xl py-8 flex flex-col max-h-full">
                <Link href="/" className='flex justify-center mb-8'>
                    <IconCube className='text-gray-400' size={50}></IconCube>
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


            <main className='bg-gray-800/90 backdrop-blur rounded-xl max-h-[95vh] overflow-auto overflow-x-hidden'>
                <>
                    {children}   
                </>
            </main>
        </div>
    </Base>
    );
}
