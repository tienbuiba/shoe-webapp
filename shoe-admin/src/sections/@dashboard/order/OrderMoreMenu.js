import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { orderDetails, orderId } from 'src/redux/create-actions/OrderAction';

// ----------------------------------------------------------------------

export default function OrderMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const {  orderCode, orderID, dataOrder } = props;
  const dispatch = useDispatch();

  console.log(dataOrder)

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
        <MenuItem component={RouterLink} to="/dashboard/order-details" onClick={ ()=> {
          dispatch(orderDetails(dataOrder))
        }} sx={{ color: 'text.secondary' }} 
        >
          <ListItemIcon>
            <Iconify icon="ic:twotone-remove-red-eye" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xem chi tiết đơn hàng" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem component={RouterLink} to="/dashboard/update-order" sx={{ color: 'text.secondary' }} onClick={ ()=> {
          dispatch(orderDetails(dataOrder))
        }}>
          <ListItemIcon>
            <Iconify icon="material-symbols:edit" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Cập nhật trạng thái" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
