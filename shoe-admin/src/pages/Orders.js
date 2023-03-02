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
import { apiAdminGetAllOrder } from 'src/services/Order';
import { fNumber } from 'src/utils/formatNumber';
import OrderMoreMenu from 'src/sections/@dashboard/order/OrderMoreMenu';
import { fDateLocal } from '../utils/formatTime';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/Iconify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'đơn hàng số', label: 'ĐƠN HÀNG SỐ', alignRight: false },
  { id: 'số lượng', label: 'TỔNG TIỀN', alignRight: false },
  { id: 'loại mail', label: 'THÔNG TIN KHÁCH HÀNG', alignRight: false },
  { id: 'loại mail', label: 'ĐẠI CHỈ ĐƠN HÀNG', alignRight: false },
  { id: 'số lượng', label: 'TRẠNG THÁI', alignRight: false },
  { id: 'thời gian', label: 'TẠO LÚC', alignRight: false },
  { id: 'thời gian', label: 'CẬP NHẬT LÚC', alignRight: false },
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetAllOrder(rowsPerPage, page, keyword)
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
    dispatch(blockUserSuccessContinue());
  }, [rowsPerPage, page, keyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Page title="Đơn hàng">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            DANH SÁCH ĐƠN HÀNG
          </Typography>
        </Stack>
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
            <TableContainer sx={{ minWidth: 800 }}>
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
                        <TableCell align="left">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.code}</TableCell>
                        <TableCell align="left">
                        {row?.items.length >= 2 ? ((row?.items[0].priceSell * row?.items[0].orderInfo.quantity) + (row?.items[1].priceSell * row?.items[1].orderInfo.quantity)) : (row?.items[0].priceSell * row?.items[0].orderInfo.quantity)}
                       </TableCell>
                        <TableCell align="left">{(row.userId)}</TableCell>
                        <TableCell align="left">{(row.address)}</TableCell>
                        <TableCell align="left">
                        <Label variant="ghost" color={(row.status === 'CANCEL' && 'error') || (row.status === 'SUCCESS' && 'success') || (row.status === 'PAIED' && 'info') || 'warning'}>
                            {row.status}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{fDateLocal(row.createdAt)}</TableCell>
                        <TableCell align="left">{fDateLocal(row.updatedAt)}</TableCell>
                        <TableCell align="left">
                          <OrderMoreMenu orderId={row.id} userId={row.userId} dataOrder={row}/>
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
      </Container>
    </Page>
  );
}
