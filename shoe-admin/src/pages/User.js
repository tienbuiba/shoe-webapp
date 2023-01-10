import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
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
  Box
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
import { fDateLocal } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'NAME', alignRight: false },
  { id: 'Email', label: 'EMAIL', alignRight: false },
  { id: 'phone', label: 'PHONE', alignRight: false },
  { id: 'role', label: 'Status', alignRight: false },
  { id: 'Created at', label: 'REGISTRATION DATE', alignRight: false },
  { id: 'a', label: '', alignRight: false },

];
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 340,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 400, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function User() {
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
    apiAdminGetListUser(rowsPerPage, page, keyword).then(result => {
      const res = result.data
      setData(res.data.items)
      setTotal(res.data.total)
    }).catch(err => {
      console.log(err)
    })
    dispatch(blockUserSuccessContinue())
  }, [rowsPerPage, page, dataUser.block, keyword])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
  }

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" gutterBottom>
            Customers
          </Typography>
        </Stack>
        <Card>
          <Box sx={{ mt: 3 }}>
            <RootStyle>
              <SearchStyle
                onChange={handleSearchChange}
                placeholder="Search user..."
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
              />
            </RootStyle>
          </Box>
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
                      <TableRow key={row.id} hover>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(row.status === 'ACTIVE' && 'success') || 'error'}>
                            {sentenceCase(row.status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          {fDateLocal(row.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu id={row.id} username={row.username} email={row.email} status={row.status} />
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
