

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const civilites = [
    {label: "Monsieur", value: "Mr"},
    {label: "Mademoiselle", value: "Mlle"},
    {label: "Madame", value: "Mme"},
]

const grades = [
    'Professeur titulaire',
    'Maître de Conférences',
    'Docteur en Informatique',
    'Assistant d\'Enseignement Supérieur et de Recherche',
    'Docteur HDR',
    'Doctorant en Informatique'
]


export default function CreateProfesseur ({isOpen, onOpenChange}){

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isInvalid) toast.error('Veuillez remplir tous les champs');
        else{
            //do stuff

        }
    }
    
    const [nom, setNom] = useState('');
    const [prenoms, setPrenoms] = useState('');
    const [civilite, setCivilite] = useState('');
    const [grade, setGrade] = useState('');
    const [isInvalid, setIsInvalid] = useState(true)

    useEffect(()=>{
        if (
             nom.trim() === ""
            || prenoms.trim() === ""
            || civilite.trim() === ""
            || grade.trim() === ""
        )
        setIsInvalid(true)
        else
        setIsInvalid(false)
    }, [nom, prenoms, civilite, grade])

    return (
        <Modal className='dark ' isOpen={isOpen} onOpenChange={onOpenChange}>
        <Toaster toastOptions={{
            className: '!bg-gray-800 !text-gray-400',
            style: {
            }
        }} />
        <ModalContent className='bg-gray-900'>
            {(onClose)=>(
                <>
                    <ModalHeader className='flex flex-col gap-1 text-gray-400'>
                        <h2>Nouveau professeur</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Input 
                            isRequired 
                            type='text'
                            label='Nom' 
                            className='mb-4'
                            classNames={{
                                input:'border-0',
                                inputWrapper: 'bg-gray-800 !border-0'
                            }}
                            value={nom}
                            onChange={e=> setNom(e.target.value)}
                            />
                            <Input 
                            isRequired 
                            type='text'
                            label='Prénoms'
                            className='mb-4'
                            classNames={{
                                input:'border-0',
                                inputWrapper: 'bg-gray-800 !border-0'
                            }}
                            value={prenoms}
                            onChange={e=>setPrenoms(e.target.value)}
                            />
                            <Select
                            onChange={e=> setNiveau(e.target.value)}
                            label="Civilité" 
                            placeholder='Sélectionner une civilité' 
                            
                            classNames={{
                                listboxWrapper: 'bg-gray-800 text-gray-400',
                                selectorIcon: 'text-white',
                                popoverContent: 'bg-gray-800',
                                trigger: 'bg-gray-800 !hover:bg-gray-700 data-[hover=true]:bg-gray-700'
                            }}
                            isRequired>
                                {civilites.map(civilite=>(
                                    <SelectItem key={civilite.value} value={civilite.value}>
                                        {civilite.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select label="Grade" 
                            className="mt-4"
                            placeholder='Sélectionner un grade' 
                            onChange={e=> setParcours(e.target.value)}
                            classNames={{
                                listboxWrapper: 'bg-gray-800 text-gray-400',
                                selectorIcon: 'text-white',
                                popoverContent: 'bg-gray-800',
                                trigger: 'bg-gray-800 !hover:bg-gray-700 data-[hover=true]:bg-gray-700'
                            }}isRequired>
                                {grades.map((grade)=>(
                                    <SelectItem key={grade} value={grade}>
                                        {grade}
                                    </SelectItem>)
                                )}
                            </Select>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' variant='light' onClick={onClose}>Fermer</Button>
                        <Button variant='solid' className='bg-indigo-600' onClick={handleSubmit}>Ajouter</Button>
                        
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
    )
}