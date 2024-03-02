

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";


const niveaux = ['L1', 'L2', 'L3', 'M1', 'M2',]
const parcoursList = [
    {label: 'GB', value:'GB'},
    {label: 'SR', value:'SR'},
    {label: 'IG', value:'IG'},
]




export default function ModifStudent ({isOpen, onOpenChange, id}){


    useEffect(()=>{
        fetchData()
    }, [id])
    
    const fetchData = async ()=>{
        try{
            const url = `http://localhost:8000/api/etudiant?id=${id}&name=`;
            const data = await fetch (url).then (res => res.json());
            const etudiant = data[0]

            setEmail(etudiant.adr_email)
            setMatricule(etudiant.matricule)
            setNiveau(etudiant.niveau)
            setParcours(etudiant.parcours)
            setNom(etudiant.nom)
            setPrenoms(etudiant.prenoms)
            
        }catch(e){
            console.error(e)
        }
    }

    const reset = ()=>{
        setEmail('')
        setMatricule('')
        setNiveau('')
        setParcours('')
        setNom('')
        setPrenoms('')
    }
    
    const handleEdit = async (e)=>{
        e.preventDefault();
        if (isInvalid) toast.error('Veuillez remplir tous les champs');
        else{
            //try{
            //    const url = `http://localhost:8000/api/etudiant?matricule=${matricule}&nom=${nom}&prenoms=${prenoms}&email=${email}$niveau=${niveau}$parcours=${parcours}`
            //    await fetch(url, {method: 'POST'})
            //    .then(rep => rep.text())
            //    .then(data => console.log(data))
            //}catch(e){
            //    toast.error(e)
            //}
        }
    }
    
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
        <Modal className='dark ' isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset}>
        <Toaster toastOptions={{
            className: '!bg-gray-800 !text-gray-400',
            style: {
            }
        }} />
        <ModalContent className='bg-gray-900'>
            {(onClose)=>(
                <>
                    <ModalHeader className='flex flex-col gap-1 text-gray-400'>
                        <h2>Modifier étudiant</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleEdit}>
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
                                selectedKeys={[niveau]}
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
                                <Select selectedKeys={[parcours]} label="Parcours" 
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
                        <Button color='danger' variant='light' onClick={()=>{
                            reset()
                            onClose()
                        }}>Fermer</Button>
                        <Button variant='solid' className='bg-indigo-600' onClick={handleEdit}>Modifier</Button>
                        
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
    )
}