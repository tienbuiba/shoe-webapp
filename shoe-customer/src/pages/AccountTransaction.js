import React, { useEffect, useState } from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs, Button, Card, Grid, InputAdornment, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import { fDateTimeSuffix } from '../utils/formatTime';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from '../redux/creates-action/LoadingAction';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import UserListHead from '../components/transaction/UserHeadList';
import Iconify from 'src/components/Iconify';
import Label from 'src/components/Label';
import { apiUserGetTransactionList } from 'src/services/Transaction';
import FormatPrice from 'src/utils/FormatPrice';
import useResponsive from 'src/hooks/useResponsive';

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



const AccountTransaction = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const { t } = useTranslation('translation');
  const [keyword, setKeyword] = useState('')
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');


  const TABLE_HEAD = [
    { id: 'thời gian', label: 'THỜI GIAN', alignRight: false },
    { id: 'đơn hàng số', label: 'MÃ GIAO DỊCH', alignRight: false },
    { id: 'loại mail', label: 'NỘI DUNG', alignRight: false },
    { id: 'TOTAL', label: 'TỔNG TIỀN', alignRight: false },
    { id: 'TYPE', label: 'LOẠI GIAO DỊCH', alignRight: false },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetTransactionList(rowsPerPage, page, keyword)
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
    <Page title={t("Transaction History")}>
      <Header />   
      <div className="container" style={{ marginTop: `${!smUp ? '125px': '250px'}` , marginBottom: `${!smUp ? '75px': '150px'}` }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
            {t("Transaction History")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="right" sx={{ mb: `${ !smUp ? '20px': ''}`}}>
            <Button
              component={NavLink}
              variant="contained"
              style={{ width: '200px' }}
              className="redOutlined_button_auth"
              endIcon={<ChevronRightIcon></ChevronRightIcon>}
              to="/account-order"
            >
            {t("Order History")}          
            </Button>
          </Grid>
        </Grid>
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            </Typography>
            <RootStyle>
              <SearchStyle
                onChange={handleSearchChange}
                placeholder= {t("Search for deals...")}  
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
              />
            </RootStyle>
          </Stack>
          <TableContainer>
            <Table>
              <UserListHead
                headLabel={TABLE_HEAD}
                rowCount={total}
              />
              <TableBody>
                {data?.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left">{fDateTimeSuffix(row.createdAt)}</TableCell>
                      <TableCell align="left">{row.transactionCode}</TableCell>
                      <TableCell align="left">{(row.message)}</TableCell>
                      <TableCell align="left">
                        <FormatPrice price={row.amount} />
                      </TableCell>
                      <TableCell align="left">
                        <Label variant="ghost" color={(row.type === 'BANK' && 'error') || (row.status === 'TRANFER' && 'success')}>
                          {row.type}
                        </Label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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

export default AccountTransaction;




