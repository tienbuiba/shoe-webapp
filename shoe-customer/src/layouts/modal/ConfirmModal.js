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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { apiUserCancelOrder } from 'src/services/Order';
import { closeConfirmModal } from 'src/redux/creates-action/ConfirmAction';
import { cancelOrder } from 'src/redux/creates-action/OrderAction';

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
      case 'CANCEL_ORDER':
        dispatch(openLoadingApi());
        apiUserCancelOrder(data.id, "reason").then(result => {
          const res = result.data;
          if (res.statusCode === 200) {
            toast.success(res.message, options);
            dispatch(closeLoadingApi());
            dispatch(cancelOrder())
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
        dispatch(closeConfirmModal());
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
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                size={matchDownSM ? 'small' : 'medium'}
                color={theme.secondary}
                onClick={handleConfirm}
              >
                Xác nhận
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  )
}
