import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Stack,
  Button,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import ProductListHead from '../sections/@dashboard/products/ProductListHead';
import ProductMoreMenu from '../sections/@dashboard/products/ProductMoreMenu';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import { fNumber } from 'src/utils/formatNumber';
import { useSelector } from 'react-redux';
import { fDateLocal } from '../utils/formatTime';
import { apiAdminGetListCategories } from 'src/services/Categories';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Tên', label: 'Tên', alignRight: false },
  { id: 'F', label: 'Quốc gia', alignRight: false },
  { id: 'Giá ', label: 'Giá ', alignRight: false },
  { id: 'Tổng', label: 'Tổng', alignRight: false },
  { id: 'Loai', label: 'Loại', alignRight: false },
  { id: 'Thời gian cập nhật', label: 'Thời gian cập nhật', alignRight: false },
  { id: 'ad', label: '', alignRight: false },
];

export default function Categories() {

  const [data, setData] = useState([])
  const navigate = useNavigate();

  const dataProduct = useSelector((state) => state.product.data);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  useEffect(() => {
    apiAdminGetListCategories().then(result => {
      const res = result.data
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [dataProduct.delete])

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
         Categories
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="contained" component={RouterLink} to="/dashboard/create-product" startIcon={<Iconify icon="eva:plus-fill" />}>
            Create categories
          </Button>      
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                />
                <TableBody>
                  {data?.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                      >
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                        <img src={   require(`../../public/static/images/${row.countryCode === null ? 'VN' : row.countryCode}.png`)} width='25px' height='20px' style={{ display: 'block', textAlign: 'center', borderRadius: '5px', justifySelf: 'flex-start' }} />
                        </TableCell>
                        <TableCell align="center">
                          {fNumber(row.price)}
                        </TableCell>
                        <TableCell align="center">
                          {fNumber(row.count)}
                        </TableCell>
                        <TableCell align="center">
                          <Label variant="ghost" color={(row.isTrusted === true && 'success') || 'error'}>
                            {(row.isTrusted === true && 'Trusted') || 'Not Trusted'}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                          {fDateLocal(row.createdAt)}
                        </TableCell>
                        <TableCell align="left">
                          <ProductMoreMenu id={row.id} price={row.price} type={row.name} status={row.isTrusted} time={row.timeExist}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
