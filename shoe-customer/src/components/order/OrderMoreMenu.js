import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import Iconify from '../Iconify';
import { showConfirmModal } from 'src/redux/creates-action/ConfirmAction';

// ----------------------------------------------------------------------

export default function OrderMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = props;
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
        <MenuItem component={RouterLink} to="/dashboard/order-details" sx={{ color: 'text.secondary' }}
        // onClick={e => dispatch(orderId(orderDetails, orderCode, orderID))}
        >
          <ListItemIcon>
            <Iconify icon="ic:twotone-remove-red-eye" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xem chi tiết đơn hàng" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}
          onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to delete this category?', id, "CANCEL_ORDER"))}
        >
          <ListItemIcon>
            <Iconify icon="material-symbols:edit" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Huy Don Hang" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
