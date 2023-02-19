import React, { useEffect, useState } from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs, Button, Card, InputAdornment, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import { fDateLocal, fDateTimeSuffix } from '../utils/formatTime';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from '../redux/creates-action/LoadingAction';
import { apiUserGetAllOrder } from '../services/Order';
import { styled } from '@mui/material/styles';
import Scrollbar from '../components/Scrollbar';
import UserListHead from '../components/transaction/UserHeadList';
import Iconify from 'src/components/Iconify';
import { fNumber } from 'src/utils/formatNumber';
import Label from 'src/components/Label';
import OrderMoreMenu from 'src/components/order/OrderMoreMenu';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 360, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const TABLE_HEAD = [
  { id: 'thời gian', label: 'THỜI GIAN', alignRight: false },
  { id: 'đơn hàng số', label: 'MÃ ĐƠN HÀNG', alignRight: false },
  { id: 'số lượng', label: 'TỔNG TIỀN', alignRight: false },
  { id: 'loại mail', label: 'ĐỊA CHỈ NHẬN HÀNG', alignRight: false },
  { id: 'số lượng', label: 'TRẠNG THÁI', alignRight: false },
  { id: 'a', label: '', alignRight: false },
];

const AccountOrder = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const { t } = useTranslation('translation');
  const [keyword, setKeyword] = useState('')
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetAllOrder(rowsPerPage, page, keyword)
      .then((result) => {
        const res = result.data;
        setData(res.data.items);
        setTotal(res.data.total);
        dispatch(closeLoadingApi());
      })
      .catch((err) => {
        console.log(err);
        dispatch(closeLoadingApi());
      });
  }, [rowsPerPage, page, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Page title="Account Order">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>Account Order</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    HOME PAGE
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/account-order"
                  >
                    Order
                  </Link>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '150px', marginBottom: '150px' }}>
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            </Typography>
            <RootStyle>
              <SearchStyle
                onChange={handleSearchChange}
                placeholder="Tìm kiếm đơn hàng..."
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
              />
            </RootStyle>
          </Stack>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={total}
                />
                <TableBody>
                  {data?.map((row) => {
                    return (
                      <TableRow key={row.id} hover sx={{ boxShadow: '20px 3px 20px rgb(0 0 0 / 4%)' }}>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left" sx={{ color: '#000', fontWeight: 500 }}>{fDateTimeSuffix(row.createdAt)}</TableCell>
                        <TableCell align="left">{row.code}</TableCell>
                        <TableCell align="left">{fNumber(row.totalPrice)}</TableCell>
                        <TableCell align="left">{(row.address)}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(row.status === 'WAITING' && 'success') || 'warning'}>
                            {row.status}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{(row.cancelReason)}</TableCell>
                        <TableCell align="left">
                          <Button
                            type="submit"
                            sx={{ fontSize: '10px', bgcolor: '#fe4c50', color: '#fff', padding: '4px', textAlign: 'center' }}
                            variant="contained"
                            component={NavLink} to={`/payment-autobank/${row.code}`}>Thanh toán</Button>
                        </TableCell>
                        <TableCell align="left">
                          <OrderMoreMenu id={row.id} />
                        </TableCell>
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
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <Footer />
    </Page>
  );
};

export default AccountOrder;




