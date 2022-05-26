import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/long-menu.css'
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';


const ITEM_HEIGHT = 48;

export default function LongMenu({element}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const options = [
      <ModalEdit element={element}/>,
      <ModalDelete element={element}/>,
  ];
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='container-menu'>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} style={{padding: '0px'}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
