

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button, Select, Input, Textarea} from "@nextui-org/react"
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

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


const PDFcomposant = ({text, soutenance})=>(
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Annee universitaire: {soutenance.annee_univ}</Text>
                <Text>Numero matricule: {soutenance.matricule}</Text>
                <Text>ID Organisme: {soutenance.idorg} </Text>
                <Text>Président: {soutenance.président} </Text>
                <Text>Examinateur: {soutenance.examinateur}</Text>
                <Text>---------------------------------------------------------------</Text>
                <Text>Procès verbal</Text>
                <Text>---------------------------------------------------------------</Text>
                <Text></Text>
                <Text>{text}</Text>
            </View>
        </Page>
    </Document>
)

export default function CreatePDF ({isOpen, onOpenChange, functionActualise, soutenance}){
    
    const [text, setText] = useState('')
    const [isInvalid, setIsInvalid] = useState (true);

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
                        <form>
                           {/* <Input 
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
                            /> */}
                            <Textarea
                                value={text}
                                onChange={e=>setText(e.target.value)}
                                isRequired
                                label='Procès verbal'
                                className='mb-4'
                                classNames={{
                                    input:'border-0',
                                    inputWrapper: 'bg-gray-800 !border-0'
                                }}
                            >

                            </Textarea>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' variant='light' onClick={onClose}>Fermer</Button>
                        <Button variant='solid' className='bg-indigo-600'>
                            <PDFDownloadLink document={<PDFcomposant text={text} soutenance={soutenance}/>} fileName="Proces.pdf">
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