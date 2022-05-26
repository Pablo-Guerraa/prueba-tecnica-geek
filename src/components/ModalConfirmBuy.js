import * as React from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';
import { green } from '@mui/material/colors';

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
  color: 'green'
};

export default function ModalConfirmBuy({modalBuy, setModalBuy}) {

  const handleClose = () => setModalBuy(false);

  return (
    <div>
      <Modal
        open={modalBuy}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <b>Compra realizada con exito <CheckIcon/></b> 
        </Box>
      </Modal>
    </div>
  );
}