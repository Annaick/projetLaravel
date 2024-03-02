

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";






export default function CreateOrganisme ({isOpen, onOpenChange, functionActualise}){

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isInvalid) toast.error('Veuillez remplir tous les champs');
        else{
            try {
                const url = 'http://127.0.0.1:8000/api/organismes'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        lieu,
                        design
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    toast.success('Organisme ajouté avec succès');
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setLieu('');
                    setDesign('');
                    // Fermez le modal
                    functionActualise();
                    onOpenChange();
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                toast.error('Une erreur s\'est produite lors de l\'ajout de l\'organisme');
            }
        }
    }
    
    const [lieu, setLieu] = useState('');
    const [design, setDesign] = useState('');
    const [isInvalid, setIsInvalid] = useState (true);

    useEffect(()=>{
        if (
            lieu.trim() === ""
            || design.trim() === ""
        )
        setIsInvalid(true)
        else
        setIsInvalid(false)
    }, [lieu, design])

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
                        <h2>Nouvel Organisme</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Input 
                            isRequired 
                            type='text'
                            label='Lieu' 
                            className='mb-4'
                            classNames={{
                                input:'border-0',
                                inputWrapper: 'bg-gray-800 !border-0'
                            }}
                            value={lieu}
                            onChange={e=> setLieu(e.target.value)}
                            />
                            <Input 
                            isRequired 
                            type='text'
                            label='Design'
                            className='mb-4'
                            classNames={{
                                input:'border-0',
                                inputWrapper: 'bg-gray-800 !border-0'
                            }}
                            value={design}
                            onChange={e=>setDesign(e.target.value)}
                            />
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