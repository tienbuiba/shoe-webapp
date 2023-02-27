import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import Iconify from '../Iconify';
import { showConfirmModal } from 'src/redux/creates-action/ConfirmAction';
import { orderDetail } from 'src/redux/creates-action/OrderAction';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function OrderMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, status, dataDetails } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');


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
        {status === "CANCEL" || status === "SUCCESS" ? (
          <>
            <MenuItem component={RouterLink} to="/order-received" onClick={() => {
              dispatch(orderDetail(dataDetails))
            }} sx={{ color: 'text.secondary' }}
            >
              <ListItemIcon>
                <Iconify icon="ic:twotone-remove-red-eye" width={20} height={24} />
              </ListItemIcon>
              <ListItemText primary={t("View order details >>")} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>

          </>
        ) : (
          <>
            <MenuItem component={RouterLink} to="/order-received" onClick={() => {
              dispatch(orderDetail(dataDetails))
            }} sx={{ color: 'text.secondary' }}
            >
              <ListItemIcon>
                <Iconify icon="ic:twotone-remove-red-eye" width={20} height={24} />
              </ListItemIcon>
              <ListItemText primary={t("View order details >>")} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
            <MenuItem sx={{ color: 'text.secondary' }}
              onClick={(e) => dispatch(showConfirmModal( t("Are you sure"), t("Do you want to cancel this order?") , id, "CANCEL_ORDER"))}
            >
              <ListItemIcon>
                <Iconify icon="material-symbols:cancel-outline-sharp" width={20} height={24} color="error" />
              </ListItemIcon>
              <ListItemText primary={t("Cancel order")} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          </>
        )}

      </Menu>
    </React.Fragment>
  );
}
