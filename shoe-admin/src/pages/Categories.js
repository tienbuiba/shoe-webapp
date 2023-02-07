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
  Button,
} from '@mui/material';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListHead } from '../sections/@dashboard/user';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { fDateLocal } from 'src/utils/formatTime';
import { apiAdminGetAllCategories } from 'src/services/Categories';
import CategoryMoreMenu from 'src/sections/@dashboard/categories/CategoryMoreMenu';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'NAME', label: 'TÊN LOẠI', alignRight: false },
  { id: 'Created at', label: 'THỜI GIAN TẠO', alignRight: false },
  { id: 'Created at', label: 'THỜI GIAN CẬP NHẬT', alignRight: false },
  { id: 'a', label: '', alignRight: false }
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

export default function Categories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState('');
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const dataDelete = useSelector(state => state.category.data);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetAllCategories(rowsPerPage, page, keyword).then(result => {
      setData(result.data.data.items);
      setTotal(result.data.data.total);
      dispatch(closeLoadingApi());
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [rowsPerPage, page, keyword, dataDelete])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            DANH SÁCH PHÂN LOẠI SẢN PHẨM
          </Typography>
        </Stack>
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Button variant="outlined" component={RouterLink} to="/dashboard/create-category" startIcon={<Iconify icon="eva:plus-fill" />}>
              Thêm loại sản phẩm
            </Button>
            <RootStyle>
              <SearchStyle
                onChange={handleSearchChange}
                placeholder="Tìm kiếm loại sản phẩm"
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
                      <TableRow
                        key={row.id}
                        hover >
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">
                          {fDateLocal(row.createdAt)}
                        </TableCell>
                        <TableCell align="left">
                          {fDateLocal(row.updatedAt)}
                        </TableCell>
                        <TableCell align="right">
                          <CategoryMoreMenu id={row.id} name={row.name} />
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
