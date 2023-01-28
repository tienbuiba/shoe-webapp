import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { closeConfirmModal } from 'src/redux/create-actions/ConfirmAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiAdminBlockUser } from 'src/services/User';
import { blockUserSuccess } from 'src/redux/create-actions/UserAction';
import { deleteProduct } from 'src/redux/create-actions/ProductAction';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { apiAdminDeleteCategory } from 'src/services/Categories';
import { apiAdminDeletePost } from 'src/services/Posts';
import { deletePost } from 'src/redux/create-actions/PostAction';

export default function ConfirmModal() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const data = useSelector(state => state.confirm.data);
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };
  const handleConfirm = () => {
    switch (data.feature) {
      case 'BLOCK_USER':
        dispatch(openLoadingApi());
        apiAdminBlockUser(data.id).then(result => {
          const res = result.data;
          if (res.statusCode === 200) {
            toast.success(res.message, options);
            dispatch(closeLoadingApi());
            dispatch(blockUserSuccess())
          } else {
            toast.error(res.message, options);
          }
        }).catch(err => {
          if (err.response.data.statusCode === 401) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          }
        })
        dispatch(closeConfirmModal())
        dispatch(closeLoadingApi());
        break
      case 'DELETE_CATEGORY':
        dispatch(openLoadingApi());
        apiAdminDeleteCategory(data.id).then(result => {
          const res = result.data;
          if (res.statusCode === 200) {
            toast.success(res.message, options);
            dispatch(closeLoadingApi());
            dispatch(deleteProduct())
          } else {
            toast.error(res.message, options);
            dispatch(closeLoadingApi());
          }
        }).catch(err => {
          if (err.response.data.statusCode === 401) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          }
        })
        dispatch(closeConfirmModal())
        dispatch(closeLoadingApi());
        break
      case 'DELETE_POST':
        dispatch(openLoadingApi());
        apiAdminDeletePost(data.id).then(result => {
          const res = result.data;
          if (res.statusCode === 200) {
            toast.success(res.message, options);
            dispatch(closeLoadingApi());
            dispatch(deletePost())
          } else {
            toast.error(res.message, options);
            dispatch(closeLoadingApi());
          }
        }).catch(err => {
          if (err.response.data.statusCode === 401) {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          } else {
            dispatch(closeLoadingApi());
            toast.error(err.response.data.message, options);
          }
        })
        dispatch(closeConfirmModal())
        dispatch(closeLoadingApi());
        break
      default:
        break
    }
  }

  const handleClose = () => {
    dispatch(closeConfirmModal());
  }
  const renderConfirm = () => {
    return (
      <>
        <DialogTitle
          id='responsive-dialog-title'
          sx={{
            pt: `${matchDownSM ? '24px' : '32px'}`,
            pl: `${matchDownSM ? '8px' : '12px'}`,
            pr: `${matchDownSM ? '8px' : '12px'}`,
            pb: `${matchDownSM ? '12px' : '12px'}`
          }}
        >
          <Grid container alignItems='center' justifyContent='center'>
            <Grid item>{data.title}</Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: '5px',
            pl: `${matchDownSM ? '10px' : '24px'}`,
            pr: `${matchDownSM ? '10px' : '24px'}`,
            pb: `${matchDownSM ? '8px' : '24px'}`,
            textAlign: 'center'
          }}
        >
          <DialogContentText>{data.message}</DialogContentText>
        </DialogContent>
      </>
    )
  }
  return (
    <Container maxWidth='xs'>
      <Dialog
        open={data.isOpen}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        {renderConfirm(data.isOpen)}
        <DialogActions sx={{ pb: '20px' }}>
          <Grid
            container
            align='center'
            justifyContent='center'
            columnGap={matchDownSM ? '20px' : '30px'}
          >
            <Grid item>
              <Button
                variant='contained'
                size={matchDownSM ? 'small' : 'medium'}
                color='error'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                size={matchDownSM ? 'small' : 'medium'}
                color={theme.secondary}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  )
}
