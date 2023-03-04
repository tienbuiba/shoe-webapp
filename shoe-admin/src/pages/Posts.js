import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Stack,
  TablePagination,
  Typography
} from '@mui/material';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { apiAdminGetPostList } from 'src/services/Posts';
import MainPost from 'src/components/post/MainPost';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';


// ----------------------------------------------------------------------

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

export default function Posts() {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const [dataPost, setDataPost] = useState([]);
  const data = useSelector(state => state.post.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [total, setTotal] = useState(0);


  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
  }
  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetPostList(rowsPerPage, page, keyword).then(res => {
      setDataPost(res.data.data.items);
      setTotal(res.data.data.total);
      dispatch(closeLoadingApi());
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [data.delete, keyword]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Bài viết">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h3" gutterBottom>
            DANH SÁCH BÀI VIẾT
          </Typography>
        </Stack>
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Button variant="outlined"  sx={{ ml:4}} component={RouterLink} to="/dashboard/create-post" startIcon={<Iconify icon="eva:plus-fill" />}>
              Thêm bài viết
            </Button>
            <RootStyle>
              <SearchStyle
                value={keyword}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm bài viết..."
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                }
              />
            </RootStyle>
          </Stack>
          <MainPost data={dataPost} />
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={total}
            sx={{ fontSize: '18px' }}
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
