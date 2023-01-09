import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  Button,
} from '@mui/material';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import OrderHeadList from 'src/sections/@dashboard/order/OrderHeadList';
import { apiUserExportOrder } from 'src/services/Order';
import { saveAs } from "file-saver";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------



export default function OrderDetails() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const dataOrder = useSelector(state => state.order.data);
  const navigate = useNavigate();
  const [dataExport, setDataExport] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');

  const TABLE_HEAD = [
    { id: 'Account', label: t('Account'), alignRight: false },
    { id: 'Password', label: t('Password'), alignRight: false },
    { id: 'Mail Recover', label: t('Mail Recover'), alignRight: false },
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setData(dataOrder.orderDetails)
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserExportOrder(dataOrder.orderID)
    .then((results) => {
      const res = results.data
      dispatch(closeLoadingApi());
      if (res.statusCode === 200) {
        let decoded = window.atob(res.data);
        setDataExport(decoded)
      }

    }).catch(error => {
      dispatch(closeLoadingApi());
    })
  }, []);

  function exportFile() {
    var blob = new Blob([dataExport], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `DanhSachMail.txt`);
  }

  return (
    <Page title="Chi tiết đơn hàng">
      <Container>
      <Grid container sx={{ mb: 3 }}>
          <Grid container item xs={6}>
            <Grid>
              <Typography variant="h6" sx={{ mr: 1 }}>
                Đơn hàng số
              </Typography></Grid>
            <Grid>
              <Typography variant="h6">
                #{dataOrder.orderCode}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} align="right">
            <Button endIcon={<FileDownloadIcon />} variant="contained" onClick={() => exportFile()}>exportFile.txt</Button>
          </Grid>
        </Grid>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderHeadList
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow key={row.id} >
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">{row.mail.username}</TableCell>
                          <TableCell align="left">{(row.mail.password)}</TableCell>
                          <TableCell align="left">{(row.mail.referenceMail)}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
