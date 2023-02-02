import React, { useEffect, useState } from 'react';
import Header from 'src/layouts/Header';
import { Box, Breadcrumbs, Button, Card, Container, InputAdornment, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import { fDateLocal } from '../utils/formatTime';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from '../redux/creates-action/LoadingAction';
import { apiUserGetAllOrder } from '../services/Order';
import styled from 'styled-components';
import Scrollbar from '../components/Scrollbar';
import UserListHead from '../components/transaction/UserHeadList';

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
  { id: 'amount', label: "ádasd", alignRight: false },
  { id: 'type', label: "adad", alignRight: false },

];
const AccountOrder = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
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
                <h3>SHOPPING CART</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    HOME PAGE
                  </Link>
                  <p>CARD</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Page title={t('title_05')}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              ádad
            </Typography>
          </Stack>
          <Card>
            <RootStyle>
              <SearchStyle
                onChange={handleSearchChange}
                placeholder={t("Search order history...")}
                startAdornment={
                  <InputAdornment position="start">
                    {/* <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
                  </InputAdornment>
                }
              />
            </RootStyle>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={total}
                  />
                  <TableBody>
                    {data?.map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          hover
                        >
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">
                            {/* <Label variant="ghost" color={(row.type === 'BUY' && 'success') || 'warning'}>
                              {row.orderType === 'BUY' ? t('order_06') : t('order_07')}
                            </Label> */}
                          </TableCell>
                          <TableCell align="left" sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            {row.mailType}
                          </TableCell>
                          <TableCell align="left">{row.orderCode}</TableCell>
                          <TableCell align="left">
                            {/* {dataLanguage === 'eng' ?
                              <>
                                {(row.totalPrice / 24000).toFixed(4)}
                              </>
                              :
                              <>
                                {fCurrency(row.totalPrice)}
                              </>
                            } */}
                          </TableCell>
                          <TableCell align="left">{row.amount}</TableCell>
                          <TableCell align="left">{fDateLocal(row.createdAt)}</TableCell>
                          <TableCell align="left">
                            {/* <Button variant="contained" size="small" endIcon={<SendIcon />} color="primary" component={RouterLink} to="/dashboard/order-details" onClick={e => dispatch(orderId(row.sellMails, row.orderCode, row.id))}>
                              {t('Details')}
                            </Button> */}
                          </TableCell>
                        </TableRow>);
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
        </Container>
      </Page >
      <Footer />
    </Page>
  );
};

export default AccountOrder;


