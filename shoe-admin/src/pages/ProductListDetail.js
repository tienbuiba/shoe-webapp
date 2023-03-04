import styled from '@emotion/styled';
import { Box, Button, Card, Container, Grid, InputAdornment, OutlinedInput, Stack, TablePagination, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import ProductCard from 'src/components/product/ProductCard';
import Scrollbar from 'src/components/Scrollbar';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { apiAdminGetProductByCategoryId } from 'src/services/Products';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { apiAdminGetCategoryById } from 'src/services/Categories';

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

const ProductListDetail = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const dataDelete = useSelector(state => state.product.data);
  const [dataCategory, setDataCategory] = useState([]);


  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetProductByCategoryId(id, rowsPerPage, page, keyword).then(res => {
      setData(res.data.data.items);
      setTotal(res.data.data.total);
      dispatch(closeLoadingApi());
      apiAdminGetCategoryById(res?.data?.data.items[0].categoryId).then((res) => {
        setDataCategory(res?.data.data.name);
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [rowsPerPage, page, keyword, dataDelete])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Page title="Sản phẩm">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            DANH SÁCH SẢN PHẨM - {dataCategory}
          </Typography>
        </Stack>
        <Card>
          <Box sx={{ mt: 3, mb: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Button component={Link} color="info" sx={{ ml:4}} to="/dashboard/products" startIcon={<ArrowBackIosIcon />} variant="contained">
                Quay lại
              </Button>
            </div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h4" gutterBottom>
              </Typography>
              <RootStyle>
                <SearchStyle
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm sản phẩm..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                />
              </RootStyle>
            </Stack>
          </Box>
          <Scrollbar>
            <Grid container spacing={3} sx={{ mb: 2, px: 3 }}>
              {data.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
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
};

export default ProductListDetail;