import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { productId } from 'src/redux/create-actions/ProductAction';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';

// ----------------------------------------------------------------------

export default function ProductMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, price, type, status, time } = props;
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
        {status === false ? <>
          <MenuItem component={RouterLink} to="/dashboard/edit-product" sx={{ color: 'text.secondary' }} onClick={e => dispatch(productId(id, price, type,time))}>
            <ListItemIcon>
              <Iconify icon="ic:round-update" width={20} height={24} />
            </ListItemIcon>
            <ListItemText primary="Cập nhật sản phẩm" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </> : <>
          <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to delete this product?', id, "DELETE_PRODUCT"))}>
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          <MenuItem component={RouterLink} to="/dashboard/edit-product" sx={{ color: 'text.secondary' }} onClick={e => dispatch(productId(id, price, type, time))}>
            <ListItemIcon>
              <Iconify icon="ic:round-update" width={20} height={24} />
            </ListItemIcon>
            <ListItemText primary="Cập nhật sản phẩm" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </>}
      </Menu>
    </React.Fragment>
  );
}
