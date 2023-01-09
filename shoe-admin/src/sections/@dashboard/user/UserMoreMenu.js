import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, status } = props;
  const dispatch = useDispatch();
  
  return (
    <React.Fragment>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {status === 'BLOCKED' ?
          <div>
            <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to unlock this account?', id, "BLOCK_USER"))}>
              <ListItemIcon>
                <Iconify icon="bi:unlock-fill" color="blue" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Unlock account" primaryTypographyProps={{ variant: 'body2', color: '#2065D1' }} />
            </MenuItem>
          </div> : <div>
            <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to unlock this account?', id, "BLOCK_USER"))}>
              <ListItemIcon>
                <Iconify icon="charm:block" color="red" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Lock account" primaryTypographyProps={{ variant: 'body2', color: 'red' }} />
            </MenuItem>
          </div>}
        <Divider />   
      </Menu>
    </React.Fragment>
  );
}
