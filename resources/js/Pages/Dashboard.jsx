import CreateSoutenance from '@/Components/createSoutenance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, useDisclosure, Card, CardFooter } from '@nextui-org/react';
import { IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Delete from '@/Components/ConfirmDelete';
import toast from 'react-hot-toast';
import ModifSoutenir from '@/Components/modifySoutenir';

export default function Dashboard({ auth }) {
    const [soutenances, setSoutenances] = useState([]);
    const [idModif, setIdModif] = useState('');
    const [idDelete, setIdDelete] = useState ('');




    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const {isOpen: isModifOpen, onOpen: onModifOpen, onOpenChange: onOpenModifChange} = useDisclosure();


    const getSoutenances = async()=>{
        const soutenances = await fetch ('http://localhost:8000/api/soutenances', {method: 'GET'})
        const data = await soutenances.json()
        console.log (data)
        setSoutenances(data)
    }

    useEffect(()=>{
        getSoutenances( )
    }, [])



    //Fonction qui supprime une soutenance
    const deleteEtudiant = async (id)=>{
        try{
            const url = `http://localhost:8000/api/soutenir/${id}`
            const response = await fetch(url, {method: 'DELETE'})
            if (response.ok){
                toast.success ('Soutenance supprimé avec succès')
            }
        }catch(e){
            toast.error('Erreur lors de la suppression')
        }
        
    }

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
            <ul className='p-4'>
                {Array.isArray(soutenances)? soutenances.map((soutenance, index) =>(
                    <Card key={index} className='dark bg-gray-800 mt-4 p-4 font-light text-sm'>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Numéro matricule: </span> {soutenance.matricule}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>ID Organisme: </span>{soutenance.idorg}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Année univeristaire: </span>{soutenance.annee_univ}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Note:</span> {soutenance.note}/20</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Président: </span>{soutenance.président}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Examinateur: </span>{soutenance.examinateur}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Rapporteur int</span>{soutenance.rapporteur_int}</p>
                        <p className='text-gray-300 mb-2 flex'><span className='mr-auto text-gray-400 underline'>Rapporteur ext</span>{soutenance.rapporteur_ext}</p>
                        <CardFooter className='gap-4 justify-end'>
                            <Button onClick={()=>{
                                setIdModif(soutenance.id);
                                onModifOpen();
                            }} isIconOnly variant='light' className="text-gray-500" aria-label='editer' type='button'><IconEdit /></Button>
                            <Button onClick={()=>{
                                setIdDelete(soutenance.id)
                                onDeleteOpen()
                            }} isIconOnly variant='light' className="text-red-500" aria-label='supprimer' type='button'><IconTrash /></Button>
                        </CardFooter>
                    </Card>

                )) : null}
            </ul>
            <CreateSoutenance isOpen={isOpen} onOpenChange={onOpenChange} functionActualise={getSoutenances} />
            <Delete deleteFunction={deleteEtudiant} functionActualise={getSoutenances} idDelete={idDelete} isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} entity={'soutenance'} />
            <ModifSoutenir functionActualise={getSoutenances} isOpen={isModifOpen} id={idModif} onOpenChange={onOpenModifChange}  />
        </AuthenticatedLayout>
    );
}
