import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { UserListHead } from '../sections/@dashboard/user';
import { useDispatch } from 'react-redux';
import { blockUserSuccessContinue } from 'src/redux/create-actions/UserAction';
import { apiAminGetAllOrder } from 'src/services/Order';
import { fNumber } from 'src/utils/formatNumber';
import OrderMoreMenu from 'src/sections/@dashboard/order/OrderMoreMenu';
import { fDateLocal } from '../utils/formatTime';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Loại', alignRight: false },
  { id: 'username', label: 'Khách hàng', alignRight: false },
  { id: 'đơn hàng số', label: 'Đơn hàng số', alignRight: false },
  { id: 'số lượng', label: 'Tổng Tiền', alignRight: false },
  { id: 'loại mail', label: 'Số lượng', alignRight: false },
  { id: 'phương thức giao dịch', label: 'Thời gian', alignRight: false },
  { id: 'a', label: '', alignRight: false },
];
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
export default function Orders() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
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
    apiAminGetAllOrder(rowsPerPage, page, keyword)
      .then((result) => {
        const res = result.data;
        setData(res.data.items);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(blockUserSuccessContinue());
  }, [rowsPerPage, page, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Page title="Order">
          <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
Orders          </Typography>
        </Stack>
        <Card>
        <RootStyle>
            <SearchStyle
              onChange={handleSearchChange}
              placeholder="Sreach order..."
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
                      <TableRow key={row.id}>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(row.type === 'BUY' && 'success') || 'warning'}>
                            {row.orderType === 'BUY' ? 'Mua' : 'Thuê'}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{row.user.username}</TableCell>
                        <TableCell align="left">{row.orderCode}</TableCell>
                        <TableCell align="left">{fNumber(row.totalPrice)}</TableCell>
                        <TableCell align="left">{fNumber(row.amount)}</TableCell>
                        <TableCell align="left">{fDateLocal(row.createdAt)}</TableCell>
                        <TableCell align="left">
                          <OrderMoreMenu orderDetails={row.sellMails} orderCode={row.orderCode} orderID={row.id} />
                        </TableCell>
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
