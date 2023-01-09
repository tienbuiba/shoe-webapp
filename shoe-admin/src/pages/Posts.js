



import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
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
import Iconify from '../components/Iconify';
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user';
import { apiAdminGetListUser } from 'src/services/User';
import { useDispatch, useSelector } from 'react-redux';
import { blockUserSuccessContinue } from 'src/redux/create-actions/UserAction';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { fNumber } from 'src/utils/formatNumber';
import { fDateLocal } from 'src/utils/formatTime';
import { apiAdminGetPostList } from 'src/services/Posts';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên khách hàng', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  // { id: 'Số dư', label: 'Số dư (VND)', alignRight: false },
  { id: 'role', label: 'Trạng thái', alignRight: false },
  { id: 'Tham gia ngày', label: 'Tham gia ngày', alignRight: false },
  { id: 'a', label: '', alignRight: false },

];
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function Posts() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const dataUser = useSelector(state => state.user.data);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
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
    apiAdminGetPostList(rowsPerPage, page, keyword).then(result => {
      const res = result.data
      setData(res.data.items)
      setTotal(res.data.total)
    }).catch(err => {
      console.log(err)
    })
  }, [rowsPerPage, page, keyword])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
        Posts
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-rent-product" startIcon={<Iconify icon="eva:plus-fill" />}>
           Create posts
         </Button>
        </Stack>
        <Card>
          <RootStyle>
            <SearchStyle
              onChange={handleSearchChange}
              placeholder="Search post..."
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
                      <TableRow key={row.id} >
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                                             <TableCell align="left">
                          <Label variant="ghost" color={(row.status === 'ACTIVE' && 'success') || 'error'}>
                            {sentenceCase(row.status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                        {fDateLocal(row.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu id={row.id} username={row.username} balance={row.balance} email={row.email} status={row.status}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 35]}
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
