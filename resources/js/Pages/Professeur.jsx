import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Card, Avatar, Button, useDisclosure} from '@nextui-org/react'
import { IconSearch,IconTrash, IconEdit } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import stc from 'string-to-color';
import CreateProfesseur from '@/Components/createProfesseur';


const getFirstLetter = name=> name[0];

export default function Professeurs({ auth }) {

    const [professeurs, setProfesseurs] = useState([])
    const [name, setName] = useState('')

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    const getProfesseurs = async ()=>{
        try{
            const url = `http://localhost:8000/api/professeur?name=${name}`;
            const professeurs = await fetch (url).then (res => res.json());
            console.log (professeurs);
            setProfesseurs(professeurs);
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        getProfesseurs();
    }, [name]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <header>
                <div className="flex items-center mt-10 mb-4 px-4 gap-4">
                    <form action="" method="get" className="  gap-4 flex items-center w-full">
                        <div className="w-6 h-6"><IconSearch className="text-gray-400 h-full"/></div>
                        <input placeholder="Nom et Prénoms" 
                            className="text-gray-400 dark rounded-full bg-gray-900/70 border-none w-full" 
                            type="text"
                            value={name}
                            onChange={e=>{setName(e.target.value)}}/>
                    </form>
                    <Button className="bg-indigo-500 text-white" onClick={onOpen}>
                       + Ajouter
                    </Button>
                </div>
            </header>

            <ul aria-label="La liste des professeurs" className="p-4">
                {professeurs.map((professeur, index)=>{
                    const color = stc (professeur.nom + professeur.prenoms)
                    return (
                        <li key={index}>
                            <Card className='dark bg-gray-900/65 mb-2'>
                                <div className="flex gap-4 p-4">
                                    <div className="gap-2 flex">
                                        <Avatar className="mb-auto" 
                                        name={getFirstLetter(professeur.nom)}
                                        style={{
                                            backgroundColor: color
                                        }}
                                        />
                                        <div className="flex flex-col ">
                                            <p><span className="font-bold">{professeur.civilite}</span>  {professeur.nom} <span >{professeur.prenoms}</span></p>
                                            <p className="text-xs text-gray-500 underline underline-offset-2">{professeur.grade}</p>
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
            <CreateProfesseur isOpen={isOpen} onOpenChange={onOpenChange} />
        </AuthenticatedLayout>
    );
}
