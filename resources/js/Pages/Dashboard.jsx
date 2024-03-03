import CreateSoutenance from '@/Components/createSoutenance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, useDisclosure } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';

export default function Dashboard({ auth }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const {isOpen: isModifOpen, onOpen: onModifOpen, onOpenChange: onOpenModifChange} = useDisclosure();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <header>
                <div className="flex items-center mt-10 mb-4 px-4 gap-4">
                    <form action="" method="get" className="  gap-4 flex items-center w-full">
                        <div className="w-6 h-6"><IconSearch className="text-gray-400 h-full"/></div>
                        <input 
                            placeholder="Nom lieu" 
                            className="text-gray-400 dark rounded-full bg-gray-900/70 border-none w-full" 
                            type="text" 
                        />
                    </form>
                    <Button onClick={onOpen} className="bg-indigo-500 text-white">
                       + Ajouter
                    </Button>
                </div>
            </header>
            <CreateSoutenance isOpen={isOpen} onOpenChange={onOpenChange} />
        </AuthenticatedLayout>
    );
}
