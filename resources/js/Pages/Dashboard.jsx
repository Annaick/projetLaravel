import CreateSoutenance from '@/Components/createSoutenance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, useDisclosure, Card, CardFooter, Input } from '@nextui-org/react';
import { IconSearch, IconEdit, IconTrash, IconPdf } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Delete from '@/Components/ConfirmDelete';
import toast from 'react-hot-toast';
import ModifSoutenir from '@/Components/modifySoutenir';
import { Zoom as Transintion } from 'react-awesome-reveal';
import CreatePDF from '@/Components/createPDF';


const date = new Date();

export default function Dashboard({ auth }) {
    const [soutenances, setSoutenances] = useState([]);
    const [idModif, setIdModif] = useState('');
    const [idDelete, setIdDelete] = useState ('');
    const [activesoutenance, setActiveSoutenance] = useState({})
    const [debut, setDebut] = useState('');
    const [fin, setFin] = useState('');
    const [id, setId] = useState('');




    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const {isOpen: isModifOpen, onOpen: onModifOpen, onOpenChange: onOpenModifChange} = useDisclosure();
    const {isOpen: isPDFOpen, onOpen: onPDFOpen, onOpenChange: onOpenPDFChange} = useDisclosure();


    const getSoutenances = async()=>{
        const soutenances = await fetch (`http://localhost:8000/api/soutenances?id=${id}&debut=${debut}&fin=${fin}`, {method: 'GET'})
        const data = await soutenances.json()
        console.log (data)
        setSoutenances(data)
    }

    useEffect(()=>{
        getSoutenances( )
    }, [id, debut, fin])



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
            <header className='w-full'>
                <div className="flex items-center w-full mt-10 mb-4 px-4 gap-4">
                <form action="" method="get" className="  gap-2 flex items-center w-full">
                        <div className="w-6 h-6"><IconSearch className="text-gray-400 h-full"/></div>
                        <input placeholder="ID" 
                            className="text-gray-400 dark rounded-full bg-gray-900/70 border-none max-w-[5rem]" 
                            type="number" 
                            name="id" 
                            id="id"
                            value={id}
                            onChange={e=>{setId(e.target.value)}} />
                        <input placeholder="Année début"
                            className="ml-auto text-gray-400 dark rounded-full bg-gray-900/70 border-none max-w-[9rem]"  
                            type="number" 
                            name="name" 
                            id="name"
                            value={debut}
                            onChange={e=>{setDebut(e.target.value)}} 
                            min={2000}
                            />
                        <input placeholder="Année fin"
                            className="text-gray-400 dark rounded-full bg-gray-900/70 border-none max-w-[9rem]"  
                            type="number" 
                            name="anneFin" 
                            id="anneFin"
                            value={fin}
                            onChange={e=>{setFin(e.target.value)}}
                            min={2000}
                            />
                    </form>
                    <Button onClick={onOpen} className="bg-indigo-500 text-white ml-auto">
                       + Ajouter
                    </Button>
                </div>
            </header>
            <Transintion cascade duration={500} triggerOnce>
                <ul className='p-4'>
                    {Array.isArray(soutenances)? soutenances.map((soutenance, index) =>(
                    <li>
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
                                <Button className='mr-auto bg-red-500/80' variant='shadow' onClick={
                                    ()=>{
                                        setActiveSoutenance(soutenance)
                                        onPDFOpen()
                                    }
                                } startContent={<IconPdf/>}>
                                    Génerer un procès verbal
                                </Button>
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
                    </li>            
                    )) : null}
                </ul>
            </Transintion>
            <CreateSoutenance isOpen={isOpen} onOpenChange={onOpenChange} functionActualise={getSoutenances} />
            <Delete deleteFunction={deleteEtudiant} functionActualise={getSoutenances} idDelete={idDelete} isOpen={isDeleteOpen} onOpenChange={onOpenDeleteChange} entity={'soutenance'} />
            <ModifSoutenir functionActualise={getSoutenances} isOpen={isModifOpen} id={idModif} onOpenChange={onOpenModifChange}  />
            <CreatePDF functionActualise={getSoutenances} isOpen={isPDFOpen} onOpenChange={onOpenPDFChange} soutenance={activesoutenance} />
        </AuthenticatedLayout>
    );
}
