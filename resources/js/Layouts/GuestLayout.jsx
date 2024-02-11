import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Base } from './Layout';


export default function Guest({ children }) {
    return (
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-800">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-700/50 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
    );
}
