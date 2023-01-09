import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import {  productRentId } from 'src/redux/create-actions/ProductAction';

// ----------------------------------------------------------------------

export default function RentMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, price, name, status} = props;
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
   
          <MenuItem component={RouterLink} to="/dashboard/update-rent-product" sx={{ color: 'text.secondary' }} onClick={e => dispatch(productRentId(id, name, price, status))}>
            <ListItemIcon>
              <Iconify icon="ic:round-update" width={20} height={24} />
            </ListItemIcon>
            <ListItemText primary="Cập nhật sản phẩm" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
    
      </Menu>
    </React.Fragment>
  );
}
