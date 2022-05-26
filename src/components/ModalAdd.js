import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
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

export default function ModalAdd({modalAddProduct, setModalAddProduct}) {

  const handleClose = () => setModalAddProduct(false);

  const [ objProduct, setObjProduct ] = useState({items: 1, price: null, product: null, quantity: null  })
  

  const addProductFn = async(e) => {
    e.preventDefault();
    await setDoc(doc(db, "Ingredients", objProduct.product), {
      item: 1,
      price: objProduct.price,
      product: objProduct.product,
      quantity: objProduct.quantity
    });
  }

  return (
    <div>
      <Modal
        open={modalAddProduct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form action="" onClick={ (e)=> addProductFn(e)}>
            <TextField onChange={ (e)=> setObjProduct({...objProduct, product: e.target.value})} label="Nombre de producto" variant="filled"/>
            <TextField onChange={ (e)=> setObjProduct({...objProduct, quantity: e.target.value})} label="cantidad en gr, L o cl" variant="filled" />
            <TextField onChange={ (e)=> setObjProduct({...objProduct, brand: e.target.value})} label="marca" variant="filled" />
            <TextField onChange={ (e)=> setObjProduct({...objProduct, price: e.target.value})} label="precio" variant="filled" />
            <Button type='submit' variant="outlined" sx={{margin: '20px 10px'}}>Añadir Producto a la lista </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
