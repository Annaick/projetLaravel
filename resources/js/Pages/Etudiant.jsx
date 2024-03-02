import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, Avatar, Input, Button, Spinner } from '@nextui-org/react';
import { IconSearch, IconTrash, IconEdit, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import stc from 'string-to-color';

const getFirstLetter = name=> name[0];

export default function Etudiant({ auth }) {

    const [etudiants, setEtudiants] = useState([])
    const [id, setId] = useState('');
    const [name, setName] = useState('')

    const getEtudiants = async ()=>{
        try{

            const url = `http://localhost:8000/api/etudiant?id=${id}&name=${name}`;
            const etudiants = await fetch (url).then (res => res.json());
            console.log (etudiants);
            setEtudiants(etudiants);
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        getEtudiants();
    }, [id, name]);


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
                    <Button className="bg-indigo-500 text-white">
                       + Ajouter
                    </Button>
                </div>
            </header>
            <ul aria-label="La liste des étudiants" className="p-4">
                {Array.isArray(etudiants)? etudiants.map((etudiant, index)=>{
                    const color = stc(etudiant.prenoms + etudiant.nom);
                    console.log(color);
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
                                        <Button isIconOnly variant='light' className="text-gray-500" aria-label='editer' type='button'><IconEdit /></Button>
                                        <Button isIconOnly variant='light' className="text-red-500" aria-label='supprimer' type='button'><IconTrash /></Button>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    )
                }) : <Spinner/>}
            </ul>
        </AuthenticatedLayout>
    );
}
