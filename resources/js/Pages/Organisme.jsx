import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Card, Button, useDisclosure} from '@nextui-org/react'
import { IconSearch, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {toast, Toaster} from 'react-hot-toast';
import CreateOrganisme from '@/Components/createOrganisme';
import Delete from '@/Components/ConfirmDelete';
import ModifOrganisme from '@/Components/modifyOrganisme';
import { Zoom as Transintion } from 'react-awesome-reveal';

export default function Organisme({ auth }) {

    const [organismes, setOrganismes] = useState([])
    const [lieu, setLieu] = useState('')
    const [idModif, setIdModif] = useState('');
    const [idDelete, setIdDelete] = useState('');



    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const {isOpen: isModifOpen, onOpen: onModifOpen, onOpenChange: onOpenModifChange} = useDisclosure();
    
    //Obtients la liste des organismes

    const getOrganismes = async ()=>{
        try{
            const url = `http://localhost:8000/api/organisme?lieu=${lieu}`;
            const organismes = await fetch (url).then (res => res.json());
            console.log (organismes);
            setOrganismes(organismes);
        }catch(e){
            console.error(e)
        }
    }

    //Fonction qui supprime un organisme
    const deleteOrganisme = async (id)=>{
        try{
            const url = `http://localhost:8000/api/organismes/${id}`
            const response = await fetch(url, {method: 'DELETE'})
            if (response.ok){
                toast.success ('Organisme supprimé avec succès')
            }
        }catch(e){
            toast.error('Erreur lors de la suppression')
        }
        
    }

    useEffect(()=>{
        getOrganismes();
    }, [lieu]);

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
                            value={lieu}
                            onChange={e=> {setLieu(e.target.value)}} />
                    </form>
                    <Button onClick={onOpen} className="bg-indigo-500 text-white">
                       + Ajouter
                    </Button>
                </div>
            </header>

            <Transintion triggerOnce cascade duration={500}>
            <ul aria-label="La liste des organismes" className="p-4">
                {organismes.map((organisme, index)=>{
                    return (
                        <li key={index}>
                            <Card className='dark bg-gray-900/65 mb-2'>
                                <div className='flex gap-4 p-4'>
                                    <div className="gap-2 flex">
                                        <div className="flex flex-col ">
                                            <p className='mb-2'>{organisme.lieu}</p>
                                            <p className="text-sm">{organisme.design}</p>
                                            <p className='text-sm text-gray-500 underline underline-offset-2'>id: {organisme.idorg}</p>
                                        </div>
                        
                                    </div>
                                    <div className="flex ml-auto my-auto gap-2">
                                                <Button onClick={()=>{
                                                    setIdModif(organisme.idorg)
                                                    onModifOpen()
                                                }} isIconOnly variant='light' className="text-gray-500" aria-label='editer' type='button'><IconEdit /></Button>
                                                <Button onClick={()=>{
                                                    setIdDelete(organisme.idorg)
                                                    onDeleteOpen()
                                                }} isIconOnly variant='light' className="text-red-500" aria-label='supprimer' type='button'><IconTrash /></Button>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    )
                })}
            </ul>
            </Transintion>
            <CreateOrganisme isOpen={isOpen} onOpenChange={onOpenChange} functionActualise={getOrganismes} />
            <Delete deleteFunction={deleteOrganisme} functionActualise={getOrganismes} idDelete={idDelete} isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} entity={"organisme"} />
            <ModifOrganisme functionActualise={getOrganismes} isOpen={isModifOpen} onOpenChange={onOpenModifChange} id={idModif}  />
        </AuthenticatedLayout>
    );
}
