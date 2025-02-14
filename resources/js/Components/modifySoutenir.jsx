

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
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


const dateActuelle = new Date();


export default function ModifSoutenir ({isOpen, onOpenChange, id, functionActualise}){


    const [etudiants, setEtudiants] = useState([]); //Contient la liste des etudiants
    const [professeurs, setProfesseurs] = useState([]); //contient la liste des professeurs
    const [organismes, setOrganismes] = useState([]);


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

    const [isInvalid, setIsInvalid] = useState(true);

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


    useEffect(()=>{
        fetchData()
        getEtudiants()
        getOrganismes()
        getProfesseurs()
    }, [id, isOpen])
    
    const fetchData = async ()=>{
        try{
            const url = `http://localhost:8000/api/soutenances?id=${id}`;
            const data = await fetch (url).then (res => res.json());
            
            const soutenance = await data[0]

            
            const annees = soutenance.annee_univ.split('-');
            
            console.log (soutenance.annee_univ)

            setMatricule(soutenance.matricule)
            setAnneeDebut(annees[0])
            setIdOrg(soutenance.idorg)
            setAnneeUniversitaire(soutenance.annee_univ)
            setExaminateur(soutenance.examinateur)
            setNote(soutenance.note)
            setPrésident(soutenance.président)
            setRapporteur_ext(soutenance.rapporteur_ext)
            setRapporteur_int(soutenance.rapporteur_int)
            
            
        }catch(e){
            console.error(e)
        }
    }

    const reset = ()=>{
        setMatricule('')
        setAnneeDebut(dateActuelle.getFullYear())
        setAnneeFin(dateActuelle.getFullYear() - 1);
        setIdOrg('')
        setAnneeUniversitaire(dateActuelle.getFullYear + '-' + dateActuelle.getFullYear())
        setExaminateur('')
        setNote(0)
        setPrésident('')
        setRapporteur_ext('')
        setRapporteur_int('')
    }

    
    const handleEdit = async (e)=>{
        e.preventDefault();
        if (isInvalid) toast.error('Veuillez remplir tous les champs');
        else{
            try {
                const url = `http://127.0.0.1:8000/api/soutenir/${id}`; 
                
                const requestOptions = {
                    method: 'PUT',
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
                    toast.success('Soutenance modifé avec succès');
                    // Réinitialisez les valeurs après l'ajout réussi si nécessaire
                    reset()
                    // Fermez le modal
                    functionActualise();
                    onOpenChange();
                } else {
                    toast.error('Une erreur s\'est produite lors de la modification du soutenance');
                }
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);
                toast.error('Une erreur s\'est produite lors de la modification du soutenance');
            }
        }
    }


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

    useEffect(()=>{
        setAnneeFin(Number(anneeDebut) + 1);
        setAnneeUniversitaire(anneeDebut + '-' + (Number(anneeDebut)+1));
    }, [anneeDebut])

    return (
        <Modal className='dark max-h-[90vh] overflow-scroll overflow-x-hidden' isOpen={isOpen} onOpenChange={onOpenChange} onClose={reset}>
        <Toaster toastOptions={{
            className: '!bg-gray-800 !text-gray-400',
            style: {
            }
        }} />
        <ModalContent className='bg-gray-900'>
            {(onClose)=>(
                <>
                    <ModalHeader className='flex flex-col gap-1 text-gray-400'>
                        <h2>Modifier soutenance</h2>
                        <span className='text-xs font-light'>Veuillez bien remplir tous les champs pour éviter toutes erreurs inutiles</span>
                    </ModalHeader>
                    <ModalBody>
                    <form onSubmit={handleEdit}>
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
                                    <AutocompleteItem value={etudiant.matricule} description={etudiant.nom + ' ' + etudiant.matricule} className="text-gray-400" key={etudiant.matricule}>
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
                                        {organisme.idorg}
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