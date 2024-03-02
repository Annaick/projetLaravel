

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";


const niveaux = ['L1', 'L2', 'L3', 'M1', 'M2',]
const parcoursList = [
    {label: 'GB', value:'GB'},
    {label: 'SR', value:'SR'},
    {label: 'IG', value:'IG'},
]



export default function CreateStudent ({isOpen, onOpenChange, functionActualise}){

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid) {
            toast.error('Veuillez remplir tous les champs');
        } else {
            try {
                const url = 'http://127.0.0.1:8000/api/etudiants'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        matricule,
                        nom,
                        prenoms,
                        adr_email: email,
                        niveau,
                        parcours
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    toast.success('Étudiant ajouté avec succès');
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setMatricule('');
                    setNom('');
                    setPrenoms('');
                    setEmail('');
                    setNiveau('');
                    setParcours('');
                    // Fermez le modal
                    functionActualise();
                    onOpenChange();
                } else {
                    toast.error('Une erreur s\'est produite lors de l\'ajout de l\'étudiant');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                toast.error('Une erreur s\'est produite lors de l\'ajout de l\'étudiant');
            }
        }
    };
    
    
    const [matricule, setMatricule] = useState('');
    const [nom, setNom] = useState('');
    const [prenoms, setPrenoms] = useState('');
    const [email, setEmail] = useState('')
    const [niveau, setNiveau]= useState('');
    const [parcours, setParcours] = useState('');
    const [isInvalid, setIsInvalid] = useState(true)

    useEffect(()=>{
        if (
            matricule.trim() === ""
            || nom.trim() === ""
            || prenoms.trim() === ""
            || email.trim() === ""
            || niveau.trim() === ""
            || parcours.trim() === ""
        )
        setIsInvalid(true)
        else
        setIsInvalid(false)
    }, [matricule, nom, prenoms, email, niveau, parcours])

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
                        <h2>Nouvel(le) étudiant(e)</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Input 
                            isRequired 
                            type='number'
                            label='N° Matricule' className='mb-4' classNames={
                                {
                                    input: '!border-0 focus:border-0',
                                    inputWrapper: 'bg-gray-800 !border-0',
                                    innerWrapper: 'border-0'
                                }
                            } 
                            value={matricule}
                            onChange={e=> setMatricule(e.target.value)}
                            
                            />
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
                            <Input 
                            isRequired 
                            type='text'
                            label='Adresse email'
                            className='mb-4'
                            classNames={{
                                input:'border-0',
                                inputWrapper: 'bg-gray-800 !border-0'
                            }}
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            />
                            <div className='flex gap-4'>
                                <Select
                                onChange={e=> setNiveau(e.target.value)}
                                label="Niveaux" 
                                placeholder='Sélectionner un niveau' 
                                
                                classNames={{
                                    listboxWrapper: 'bg-gray-800 text-gray-400',
                                    selectorIcon: 'text-white',
                                    popoverContent: 'bg-gray-800',
                                    trigger: 'bg-gray-800 !hover:bg-gray-700 data-[hover=true]:bg-gray-700'
                                }}
                                isRequired>
                                    {niveaux.map(niveau=>(
                                        <SelectItem key={niveau} value={niveau}>
                                            {niveau}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select label="Parcours" 
                                placeholder='Sélectionner un parcours' 
                                onChange={e=> setParcours(e.target.value)}
                                classNames={{
                                    listboxWrapper: 'bg-gray-800 text-gray-400',
                                    selectorIcon: 'text-white',
                                    popoverContent: 'bg-gray-800',
                                    trigger: 'bg-gray-800 !hover:bg-gray-700 data-[hover=true]:bg-gray-700'
                                }}isRequired>
                                    {parcoursList.map((parcour)=>(
                                        <SelectItem key={parcour.value} value={parcour.value}>
                                            {parcour.label}
                                        </SelectItem>)
                                    )}
                                </Select>
                            </div>
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