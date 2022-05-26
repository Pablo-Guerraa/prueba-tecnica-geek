import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalDelete({element}) {
  // Funciones para abrir y cerrar modal (MUI)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteProduct = async() => {
    // Cierre de modal 
    handleClose()
    // Buscando el Id en la coleccion 
    const q = query(collection(db, "Ingredients"), where("product", "==", element.product));
    const querySnapshot = await getDocs(q);
    const idRef = querySnapshot.docs[0].id
    // Eliminando el documento con el id de referencia
    await deleteDoc(doc(db, "Ingredients", idRef));
}

  return (
    <div>
      <Button onClick={handleOpen} sx={{color: 'red'}}>Eliminar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            estas seguro que quieres eliminar este contenido
          </div>
          <button onClick={deleteProduct}>Aceptar <AcUnitIcon/></button>
        </Box>
      </Modal>
    </div>
  );
}