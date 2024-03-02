

import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Button} from "@nextui-org/react"
import { Toaster, toast } from "react-hot-toast";






export default function Delete ({isOpen, onOpenChange, entity, deleteFunction, idDelete, functionActualise}){

    const handleDelete = async (e)=>{
        e.preventDefault();
        await deleteFunction(idDelete)
        await functionActualise()
        onOpenChange()
    }
    
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
                        <h2>Effacer un {entity}</h2>
                        <span className='text-xs font-light'>Êtes-vous sûr(e)? Cette action sera irréversible</span>
                    </ModalHeader>
                    <ModalBody>
                        <Button variant="ghost" onClick={onClose}>
                            Fermer
                        </Button>
                        <Button color="danger" className="bg-red-600" variant="solid" onClick={handleDelete} >
                            Effacer
                        </Button>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    </Modal>
    )
}