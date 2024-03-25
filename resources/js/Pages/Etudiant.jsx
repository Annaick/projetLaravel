import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, Avatar, Input, Button, ModalContent, Spinner, useDisclosure, RadioGroup, Radio} from '@nextui-org/react';
import { IconSearch, IconTrash, IconEdit} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import CreateStudent from '@/Components/createStudent';
import Delete from '@/Components/ConfirmDelete';
import ModifStudent from '@/Components/modifyStudent';
import { Zoom as Transintion } from 'react-awesome-reveal';
import stc from 'string-to-color';
import toast from 'react-hot-toast';

const getFirstLetter = name=> name[0];



export default function Etudiant({ auth }) {

    //Stocke la liste des étudiants à afficher et les parametres de recherche
    const [etudiants, setEtudiants] = useState([])
    const [getAll, setGetAll] = useState(true)
    const [id, setId] = useState('');
    const [idModif, setIdModif] = useState('');
    const [idDelete, setIdDelete] = useState ('');
    const [name, setName] = useState('');



    //Fonction qui supprime un étudiant
    const deleteEtudiant = async (id)=>{
        try{
            const url = `http://localhost:8000/api/etudiants/${id}`
            const response = await fetch(url, {method: 'DELETE'})
            if (response.ok){
                toast.success ('Etudiant supprimé avec succès')
            }
        }catch(e){
            toast.error('Erreur lors de la suppression')
        }
        
    }


    //création étudiant
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onOpenDeleteChange} = useDisclosure();
    const {isOpen: isModifOpen, onOpen: onModifOpen, onOpenChange: onOpenModifChange} = useDisclosure();

    const getEtudiants = async ()=>{
        try{

            if (getAll){
                const url = `http://localhost:8000/api/etudiant?id=${id}&name=${name}`;
                const etudiants = await fetch (url).then (res => res.json());
                setEtudiants(etudiants)
            }else{
                
                const url = `http://localhost:8000/api/etudiants/sans-soutenance?id=${id}&name=${name}`;
                const etudiants = await fetch (url).then (res => res.json());
                console.log(etudiants)
                setEtudiants(etudiants.etudiants_sans_soutenance)
            }
            
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        getEtudiants();
    }, [id, name, getAll]);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <header>
                <div className="flex items-center mt-10 mb-4 px-4 gap-4">
                    <form action="" method="get" className="  gap-4 flex items-center w-full">
                        <div className="w-6 h-6"><IconSearch className="text-gray-400 h-full"/></div>
                        <input placeholder="ID" 
                            className="text-gray-400 dark rounded-full bg-gray-900/70 border-none max-w-[6rem]" 
                            type="number" 
                            name="id" 
                            id="id"
                            value={id}
                            onChange={e=>{setId(e.target.value)}} />
                        <input placeholder="Nom et Prénoms" className="text-gray-400 dark rounded-full bg-gray-900/70 border-none w-full" 
                            type="text" 
                            name="name" 
                            id="name"
                            value={name}
                            onChange={e=>{setName(e.target.value)}} />
                    </form>
                    <Button className="bg-indigo-500 text-white" onClick={onOpen}>
                       + Ajouter
                    </Button>
                </div>
                <div className='p-4'>
                    <RadioGroup classNames={{
                        wrapper: "flex gap-10 justify-center",
                        label: 'text-center',
                    }}
                    orientation="horizontal"  
                    defaultValue="tous"
                    onChange={(e)=>{
                        if (e.target.value === 'tous')
                            setGetAll(true)
                        else
                            setGetAll(false)  
                    }}
                    >
                        <Radio className='dark' classNames={{
                            label: "text-gray-400"
                        }} value="tous" style={{color: 'white'}}>Tous</Radio>
                        <Radio className='dark' classNames={{
                            label: "text-gray-400"
                        }}  value="pas_de_soutenance">Pas encore de soutenance</Radio>
                    </RadioGroup>
                </div>
            </header>
            <Transintion cascade duration={300} triggerOnce>
                <ul aria-label="La liste des étudiants" className="p-4">
                    {Array.isArray(etudiants)? etudiants.map((etudiant, index)=>{
                        const color = stc(etudiant.prenoms + etudiant.nom);
                        return (
                            <li key={index}>
                                <Card className='dark bg-gray-900/65 mb-2'>
                                    <div className="gap-2 flex p-4">
                                        <Avatar className={`mb-auto`} name={getFirstLetter(etudiant.nom)}
                                            style={{
                                                backgroundColor: color
                                            }}
                                        />
                                        <div className="flex flex-col ">
                                            <p>{etudiant.matricule} - {etudiant.nom} <span >{etudiant.prenoms}</span></p>
                                            <a className="mb-4" href={`mailto:${etudiant.adr_email}`}>
                                                <p className="text-xs text-gray-500 underline underline-offset-2">{etudiant.adr_email}</p>
                                            </a>
                                            <p className="text-gray-400 text-sm">Niveau: {etudiant.niveau}</p>
                                            <p className="text-gray-400 text-sm">Parcours: {etudiant.parcours} </p>
                                        </div>
                                        <div className="flex ml-auto my-auto gap-2">
                                            <Button onClick={()=>{
                                                setIdModif(etudiant.matricule);
                                                onModifOpen();
                                            }} isIconOnly variant='light' className="text-gray-500" aria-label='editer' type='button'><IconEdit /></Button>
                                            <Button onClick={()=>{
                                                setIdDelete(etudiant.matricule)
                                                onDeleteOpen()
                                            }} isIconOnly variant='light' className="text-red-500" aria-label='supprimer' type='button'><IconTrash /></Button>
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        )
                    }) : <div className='flex justify-center'>
                            <Spinner/>
                        </div>}
                </ul>
            </Transintion>    
            <CreateStudent isOpen={isOpen} functionActualise={getEtudiants} onOpenChange={onOpenChange} />
            <Delete isOpen={isDeleteOpen} functionActualise={getEtudiants} onOpenChange={onOpenDeleteChange} entity={"etudiant"} deleteFunction={deleteEtudiant} idDelete={idDelete} />
            <ModifStudent functionActualise={getEtudiants} isOpen={isModifOpen} onOpenChange={onOpenModifChange} id={idModif} />
        </AuthenticatedLayout>
    );
}
