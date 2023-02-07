import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';
import { categoryId } from 'src/redux/create-actions/CategoryAction';

// ----------------------------------------------------------------------

export default function CategoryMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = props;
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
          sx: { width: 150, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to delete this category?', id, "DELETE_CATEGORY"))}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} style={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2', color: 'red' }} />
        </MenuItem>
        <Divider></Divider>
        <MenuItem component={RouterLink} to="/dashboard/edit-category" sx={{ color: 'text.secondary' }} onClick={e => dispatch(categoryId(id, name))}>
          <ListItemIcon>
            <Iconify icon="material-symbols:edit" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Cập nhật" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
