import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Card, Button} from '@nextui-org/react'
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons-react';

export default function Organisme({ auth, organismes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <header>
                <div className="flex items-center mt-10 mb-4 px-4 gap-4">
                    <form action="" method="get" className="  gap-4 flex items-center w-full">
                        <div className="w-6 h-6"><IconSearch className="text-gray-400 h-full"/></div>
                        <input placeholder="Nom lieu" className="text-gray-400 dark rounded-full bg-gray-900/70 border-none w-full" type="text" name="name" id="name" />
                    </form>
                    <Button className="bg-indigo-500 text-white">
                       + Ajouter
                    </Button>
                </div>
            </header>

            <ul aria-label="La liste des organismes" className="p-4">
                {organismes.map((organisme, index)=>{
                    return (
                        <li key={index}>
                            <Card className='dark bg-gray-900/65 mb-2'>
                                <div className='flex gap-4 p-4'>
                                    <div className="gap-2 flex">
                                        <div className="flex flex-col ">
                                            <p>{organisme.idorg} - {organisme.lieu}</p>
                                            <p className="text-xs text-gray-500 underline underline-offset-2">{organisme.design}</p>
                                        </div>
                        
                                    </div>
                                    <div className="flex ml-auto my-auto gap-2">
                                                <Button isIconOnly variant='light' className="text-gray-500" aria-label='editer' type='button'><IconEdit /></Button>
                                                <Button isIconOnly variant='light' className="text-red-500" aria-label='supprimer' type='button'><IconTrash /></Button>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    )
                })}
            </ul>
        </AuthenticatedLayout>
    );
}
