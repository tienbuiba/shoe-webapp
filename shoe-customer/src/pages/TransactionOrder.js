import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import UserListHead from 'src/components/transaction/UserHeadList';
import { useTranslation } from 'react-i18next';
import { fDateLocal } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
import { apiUserGetAllOrder } from 'src/services/Order';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import TokenService from 'src/services/TokenService';
import { orderId } from 'src/redux/creates-action/OrderAction';
import SendIcon from '@mui/icons-material/Send';
// ----------------------------------------------------------------------


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

export default function Order() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const { t } = useTranslation('translation');
  const [keyword, setKeyword] = useState('')
  const [total, setTotal] = useState(0);
  const dataLanguage = TokenService.getLocalLanguage();
  const dispatch = useDispatch();

  const TABLE_HEAD = [
    { id: 'amount', label: t('order_02'), alignRight: false },
    { id: 'type', label: t('mailType'), alignRight: false },
    { id: 'orderCode', label: t('orderCode'), alignRight: false },
    { id: 'typeg', label: t('order_03'), alignRight: false },
    { id: 'adadasd', label: t('order_04'), alignRight: false },
    { id: 'Email', label: t('order_05'), alignRight: false },
    { id: 'a', label: '', alignRight: false }
  ];

  const navigate = useNavigate();
  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

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
    <Page title={t('title_05')}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('order_01')}
          </Typography>
        </Stack>
        <Card>
          <RootStyle>
            <SearchStyle
              onChange={handleSearchChange}
              placeholder={t("Search order history...")}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
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
                  onRequestSort={handleRequestSort}
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
                          <Label variant="ghost" color={(row.type === 'BUY' && 'success') || 'warning'}>
                            {row.orderType === 'BUY' ? t('order_06') : t('order_07')}
                          </Label>
                        </TableCell>
                        <TableCell align="left" sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          {row.mailType}
                        </TableCell>
                        <TableCell align="left">{row.orderCode}</TableCell>
                        <TableCell align="left">
                          {dataLanguage === 'eng' ?
                            <>
                              {(row.totalPrice / 24000).toFixed(4)}
                            </>
                            :
                            <>
                              {fCurrency(row.totalPrice)}
                            </>
                          }
                        </TableCell>
                        <TableCell align="left">{row.amount}</TableCell>
                        <TableCell align="left">{fDateLocal(row.createdAt)}</TableCell>
                        <TableCell align="left">
                          <Button variant="contained" size="small" endIcon={<SendIcon />} color="primary" component={RouterLink} to="/dashboard/order-details" onClick={e => dispatch(orderId(row.sellMails, row.orderCode, row.id))}>
                            {t('Details')}
                          </Button>
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
  );
}
