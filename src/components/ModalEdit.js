import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
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

export default function ModalEdit({element}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ objProduct, setObjProduct ] = useState({items: 1, price: null, product: null, quantity: null  })

  const editProduct = async(e) => {
    e.preventDefault();
    console.log(objProduct);
    // Buscando el Id en la coleccion 
    const q = query(collection(db, "Ingredients"), where("product", "==", element.product));
    const querySnapshot = await getDocs(q);
    const idRef = querySnapshot.docs[0].id

    // Editando el documento con el id de referencia
    const washingtonRef = doc(db, "Ingredients", idRef);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, objProduct);
}

  return (
    <div style={{width: '100%'}}>
      <Button onClick={handleOpen} sx={{color: 'rgb(205, 205, 41)', width: '100%', justifyContent: 'start'}}>Editar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onClick={(e)=> editProduct(e)}>
            <TextField onChange={ (e)=>setObjProduct({...objProduct, product: e.target.value})} label="Nombre de producto" variant="filled"/>
            <TextField onChange={ (e)=>setObjProduct({...objProduct, quantity: e.target.value})} label="cantidad en gr, L o cl" variant="filled" />
            <TextField onChange={ (e)=>setObjProduct({...objProduct, brand: e.target.value})} label="marca" variant="filled" />
            <TextField onChange={ (e)=>setObjProduct({...objProduct, price: e.target.value})} label="precio" variant="filled" />
            <Button type='submit' variant="outlined" sx={{margin: '20px 10px'}}>Confirmar Edición</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}