import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import { apiUserGetTransactionDetail } from 'src/services/User';
import UserListHead from 'src/components/transaction/UserHeadList';
import { useTranslation } from 'react-i18next';
import { fDateLocal } from 'src/utils/formatTime';
import { fCurrency} from 'src/utils/formatNumber';
import { updateBalance } from 'src/redux/creates-action/balanceAction';
import { useDispatch} from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import TokenService from 'src/services/TokenService';

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


export default function Transaction() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('')
  const dataLanguage = TokenService.getLocalLanguage();
  const [total, setTotal] = useState(0);

  const TABLE_HEAD = [
    { id: 'name', label: t('transaction_02'), alignRight: false },
    { id: 'role', label: t('transaction_03'), alignRight: false },
    { id: 'adadasd', label: t('transaction_04'), alignRight: false },
    { id: 'Email', label: t('transaction_05'), alignRight: false },
    { id: 'time', label: t('transaction_09'), alignRight: false },
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

  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetTransactionDetail(rowsPerPage, page, keyword)
      .then((result) => {
        const res = result.data;
        setData(res.data.items);
        setTotal(res.data.total);
        dispatch(updateBalance());
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
    <Page title={t('title_02')}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('transaction_01')}
          </Typography>
        </Stack>
        <Card>
          <RootStyle>
            <SearchStyle
              onChange={handleSearchChange}
              placeholder={t("Search transaction history...")}
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
                          <Label variant="ghost" color={(row.type !== 'MINUS' && 'success') || 'error'}>
                            {row.type !== 'MINUS' ? t('transaction_07') : t('transaction_08')}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          {/* {dataLanguage === 'eng' ?
                            <>
                              {(row.amount / 24000).toFixed(4)}
                            </>
                            :
                            <>
                              {fCurrency(row.amount)}
                            </>
                          } */}
                        </TableCell>
                        <TableCell align="left">{row.message}</TableCell>
                        <TableCell align="left">{row.type === 'MINUS' ? '' : row.type.substring(4)}</TableCell>
                        <TableCell align="left">{fDateLocal(row.createdAt)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={total}
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
