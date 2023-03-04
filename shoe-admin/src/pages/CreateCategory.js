import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Card
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { apiAdminCreateCategory } from 'src/services/Categories';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  }

  const handleSubmit = () => {
    if (categoryName !== "") {
      apiAdminCreateCategory(categoryName)
        .then(res => {
          if (res?.data.statusCode === 200) {
            toast.success("Đã tạo loại sản phẩm thành công!", options);
            setCategoryName('')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      toast.error("Tên loại sản phẩm không được để trống!", options);
    }
  };
  return (
    <Page title="Thêm loại sản phẩm">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          THÊM LOẠI SẢN PHẨM
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button component={Link} color="info" to="/dashboard/Categories" startIcon={<ArrowBackIosIcon />} variant="contained">
            Quay lại
          </Button>
        </div>
        <Container maxWidth="lg">
          <Card sx={{ py: 10, px: 15 }} >
            <Grid container spacing={3} >
              <Grid item xs={6} >
                <Typography variant="h4">
                  LOẠI SẢN PHẨM
                </Typography>

              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="categoryName"
                  label="Loại sản phẩm"
                  placeholder="Nhập tên loại sản phẩm"
                  value={categoryName}
                  onChange={handleChangeCategoryName}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sx={{ pr: '24px', mt: '10px' }}>
              </Grid>
              <Grid item xs={4} sx={{ pr: '24px', mt: '10px' }}>
                <Button
                  variant="contained"
                  endIcon={<Iconify icon="eva:plus-fill" />}
                  size="medium"
                  component="span"
                  color="error"
                  onClick={handleSubmit}
                >
                  Thêm Loại Sản Phẩm
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Container>
      <ToastContainer />
    </Page>
  );
}

export default CreateCategory;
