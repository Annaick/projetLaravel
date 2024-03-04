

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, Textarea} from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import ConfirmPassword from "@/Pages/Auth/ConfirmPassword";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: "white",
    },
    section:{
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})




const PDFcomposant = ({text, soutenance, nom, parcours})=>(
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={{textAlign: 'center'}} >PROCES VERBAL</Text>
                <Text style={{textAlign: 'center'}} >SOUTENANCE DE FIN D'ETUDES POUR L'OBTENTION DU DIPLOME DE LICENCE PROFESSIONNELLE</Text>
                <Text style={{textAlign: 'center'}} >Mention: informatique</Text>
                <Text style={{textAlign: 'center', marginBottom:'1rem'}} >Parcours: {parcours}</Text>
                <Text style={{marginBottom: 20}}>Mr/Mlle {nom}</Text>
                <Text style={{marginBottom: 20}}>A soutenu publiquement son mémoire de fin d'études pour l'obtention du diplôme de Licence professionnelle.</Text>
                <Text style={{marginBottom: 20}}>Après la déliberation, la commission des membres du Jury a attribué la note de {soutenance.note}/20</Text>
                <Text style={{textDecoration: 'underline'}}>Membres du Jury</Text>
                <Text>Président: {soutenance.président} </Text>
                <Text>Examinateur: {soutenance.examinateur}</Text>
                <Text>Rapporteurs: {soutenance.rapporteur_int}, {soutenance.rapporteur_ext}</Text>
                <Text></Text>
                <Text>{text}</Text>
            </View>
        </Page>
    </Document>
)

export default function CreatePDF ({isOpen, onOpenChange, functionActualise, soutenance}){
    
    const [text, setText] = useState('')
    const [nom, setNom] = useState('')
    const [parcours, setParcours] = useState('')
    const [isInvalid, setIsInvalid] = useState(true)


    useEffect(()=>{
        fetchData(soutenance.matricule)
    }, [soutenance])
    
    const fetchData = async (id)=>{
        try{
            const url = `http://localhost:8000/api/etudiant?id=${id}&name=`;
            const data = await fetch (url).then (res => res.json());
            const etudiant = data[0]
    
            setNom (etudiant.nom + ' ' + etudiant.prenoms)

            if (etudiant.parcours === 'GB'){
                setParcours('Génie logiciel et Base de données')
            }
            else if (etudiant.parcours === 'IG')
                setParcours ('Informatique Génerale')
            else
                setParcours ('Administrateur système et réseaux')
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        if (
            text.trim() === ""
        )
        setIsInvalid(true)
        else
        setIsInvalid(false)
    }, [text])

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
                        <h2>Génerer un PDF</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-gray-300">Votre document est prêt à être téléchargé.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' variant='light' onClick={onClose}>Fermer</Button>
                        <Button variant='solid' className='bg-indigo-600'>
                            <PDFDownloadLink document={<PDFcomposant nom={nom} parcours={parcours} text={text} soutenance={soutenance}/>} fileName="Proces.pdf">
                                {({loadign})=> loadign? 'Chargement...': 'Télécharger'}
                            </PDFDownloadLink>
                        </Button>
                        
                        
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
    )
}