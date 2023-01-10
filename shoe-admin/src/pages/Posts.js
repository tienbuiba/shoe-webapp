import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Button,
  Card,
  Container,
  Stack,
  Typography
} from '@mui/material';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
import { apiAdminGetPostList } from 'src/services/Posts';
import UpdateRentService from './UpdateRentService';
import MainPost from 'src/components/post/MainPost';

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
  const [dataPost, setDataPost] = useState([])

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
    apiAdminGetPostList().then(res => {
      setDataPost(res.data.data.items)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <Page title="User">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" gutterBottom>
            Posts
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-post" startIcon={<Iconify icon="eva:plus-fill" />}>
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
        </Card>
        <MainPost data={dataPost} />
      </Container>
    </Page>
  );
}
