import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Stack, Typography, Button, Grid } from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { ProductList } from 'src/sections/@dashboard/products';
import { apiAdminGetAllCategories } from 'src/services/Categories';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';

// ----------------------------------------------------------------------

export default function Product() {
  const navigate = useNavigate();
  const [dataCategory, setDataCategory] = useState([]);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleAddProduct = () => {
    navigate('/dashboard/create-product', { replace: true });
  }

  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetAllCategories(rowsPerPage, page, keyword).then(res => {
      setDataCategory(res.data.data.items);
      dispatch(closeLoadingApi());
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [keyword]);

  return (
    <Page title="Sản phẩm">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          DANH SÁCH SẢN PHẨM
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <Stack direction="row" alignItems="center" spacing={3} justifyContent="flex-start" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Button startIcon={<Iconify icon={'akar-icons:plus'} />} onClick={handleAddProduct} variant="outlined">Thêm sản phẩm</Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <ProductList dataCategory={dataCategory} />
      </Container>
    </Page>
  );
}

