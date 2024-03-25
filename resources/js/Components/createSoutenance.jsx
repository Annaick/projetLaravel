

import { Modal,
    ModalContent, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Button, 
    Input, 
    Autocomplete,
    AutocompleteItem,
 } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const dateActuelle = new Date();

export default function CreateSoutenance ({isOpen, onOpenChange, functionActualise}){

    const [etudiants, setEtudiants] = useState([]); //Contient la liste des etudiants
    const [professeurs, setProfesseurs] = useState([]); //contient la liste des professeurs
    const [organismes, setOrganismes] = useState([]);
    
    //recuperer la liste des etudiants
    const getEtudiants = async ()=>{
        try{
            const url = `http://localhost:8000/api/etudiant`;
            const etudiants = await fetch (url).then (res => res.json());
            setEtudiants(etudiants)
            
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        getEtudiants()
        getProfesseurs()
        getOrganismes()
    }, [isOpen])

    //recuperer la liste des professeurs
    const getProfesseurs = async ()=>{
        try{
            const url = `http://localhost:8000/api/professeur`;
            const professeurs = await fetch (url).then (res => res.json());
            setProfesseurs(professeurs);
        }catch(e){
            console.error(e)
        }
    }

    //Recuperer la liste des organismes
    const getOrganismes = async ()=>{
        try{
            const url = `http://localhost:8000/api/organisme`;
            const organismes = await fetch (url).then (res => res.json());
            setOrganismes(organismes);
        }catch(e){
            console.error(e)
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isInvalid) {
            toast.error('Veuillez remplir tous les champs');
        }

        else{
            try {
                const url = 'http://127.0.0.1:8000/api/soutenir'; 
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        matricule,
                        idorg,
                        annee_univ,
                        note,
                        président,
                        examinateur,
                        rapporteur_int,
                        rapporteur_ext
                    })
                };
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    toast.success('Étudiant ajouté avec succès');
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    setMatricule('');
                    setIdOrg('');
                    setPrésident('');
                    setNote(0);
                    setExaminateur('');
                    setRapporteur_int('');
                    setRapporteur_ext('');
                    // Fermez le modal
                    functionActualise();
                    functionActualise();
                    onOpenChange();
                } else {
                    toast.error('Une erreur s\'est produite lors de l\'ajout du soutenance');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                toast.error('Une erreur s\'est produite lors de l\'ajout du soutenance');
            }
        }
    }
    
    const [matricule, setMatricule] = useState('');
    const [idorg, setIdOrg] = useState('');
    const [anneeDebut, setAnneeDebut] = useState(dateActuelle.getFullYear());
    const [anneFin, setAnneeFin] = useState(dateActuelle.getFullYear() + 1)
    const [annee_univ, setAnneeUniversitaire] = useState(anneeDebut +'-'+ (anneeDebut + 1));
    const [note, setNote]= useState(0);
    const [président, setPrésident] = useState('');
    const [examinateur, setExaminateur] = useState('');
    const [rapporteur_int, setRapporteur_int] = useState('');
    const [rapporteur_ext, setRapporteur_ext] = useState('');



    useEffect(()=>{
        setAnneeFin(Number(anneeDebut) + 1);
        setAnneeUniversitaire(anneeDebut + '-' + (Number(anneeDebut)+1));
    }, [anneeDebut])



    const [isInvalid, setIsInvalid] = useState(true) // Devient false si tous les champs sont ok


    //verifie que tous les champs sont ok
    useEffect(()=>{
        if (
            matricule.trim() === ""
            || idorg === ""
            || président.trim() === ""
            || examinateur.trim() === ""
            || rapporteur_int.trim() === ""
            || rapporteur_ext.trim() === ""
        )
        setIsInvalid(true)
        else
        setIsInvalid(false)
    }, [matricule, idorg, anneFin, anneeDebut, note, président, examinateur, rapporteur_ext, rapporteur_int])

    return (
        <Modal className='dark max-h-[90vh] overflow-scroll overflow-x-hidden' isOpen={isOpen} onOpenChange={onOpenChange}>
        <Toaster toastOptions={{
            className: '!bg-gray-800 !text-gray-400',
            style: {
            }
        }} />
        <ModalContent className='bg-gray-900'>
            {(onClose)=>(
                <>
                    <ModalHeader className='flex flex-col gap-1 text-gray-400'>
                        <h2>Nouveau soutenance</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <Autocomplete 
                                label="Matricule étudiant"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setMatricule(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {etudiants.map((etudiant)=>(
                                    <AutocompleteItem value={etudiant.matricule} description={etudiant.nom + ' ' + etudiant.prenoms} className="text-gray-400" key={etudiant.matricule}>
                                        {etudiant.matricule}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete 
                                label="ID organisme"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setIdOrg(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {organismes.map((organisme)=>(
                                    <AutocompleteItem onClick={()=>{setIdOrg(organisme.idorg)}} value={organisme.idorg} description={organisme.lieu + ' - ' + organisme.design} className="text-gray-400" key={organisme.idorg}>
                                        {organisme.idorg.toString()}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <p className="text-gray-400 text-sm ml-2">Année univeristaire</p>
                            <div className="flex gap-4 mb-4">
                                <Input 
                                isRequired 
                                label='Debut'
                                type='number'
                                className='mb-4' classNames={
                                    {
                                        input: '!border-0 focus:border-0',
                                        inputWrapper: 'bg-gray-800 !border-0',
                                        innerWrapper: 'border-0'
                                    }
                                } 
                                value={anneeDebut}
                                onChange={e=> setAnneeDebut(e.target.value)}

                                />

                                <Input 
                                isRequired 
                                label='Fin'
                                isDisabled
                                type='number'
                                className='mb-4' classNames={
                                    {
                                        input: '!border-0 focus:border-0',
                                        inputWrapper: 'bg-gray-800 !border-0',
                                        innerWrapper: 'border-0'
                                    }
                                } 
                                value={anneFin}
                                />

                            </div>
                            <Input 
                            isRequired 
                            type='number'
                            labelPlacement="outside-left"
                            min={0}
                            max={20}
                            label='Note' className='mb-4' classNames={
                                {
                                    input: '!border-0 focus:border-0',
                                    inputWrapper: 'bg-gray-800 !border-0',
                                    innerWrapper: 'border-0'
                                }
                            } 
                            value={note}
                            onChange={e=> setNote(e.target.value)}
                            
                            />
                            <Autocomplete 
                                label="Président"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setPrésident(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {professeurs. map((professeur)=>(
                                    <AutocompleteItem description={professeur.grade} className="text-gray-400" key={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms} value={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}>
                                        {professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete 
                                label="Examinateur"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setExaminateur(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {professeurs. map((professeur)=>(
                                    <AutocompleteItem description={professeur.grade} className="text-gray-400" key={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms} value={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}>
                                        {professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete 
                                label="Rapporteur int"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setRapporteur_int(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {professeurs. map((professeur)=>(
                                    <AutocompleteItem description={professeur.grade} className="text-gray-400" key={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms} value={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}>
                                        {professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete 
                                label="Raporteur ext"
                                isRequired
                                className="dark text-gray-500 mb-4"
                                onSelect={e=>setRapporteur_ext(e.target.value)}
                                classNames={
                                    {
                                        listbox: 'bg-gray-800',
                                        listboxWrapper: 'bg-gray-800',
                                        popoverContent: 'bg-gray-800',
                                        base: '!border-0'
                                    }
                                } 
                            >
                                {professeurs. map((professeur)=>(
                                    <AutocompleteItem description={professeur.grade} className="text-gray-400" key={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms} value={professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}>
                                        {professeur.civilite + ' ' + professeur.nom + ' ' + professeur.prenoms}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            
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