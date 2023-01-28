import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,

} from '@mui/material';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';
import { apiAdminCreateCategory } from 'src/services/Categories';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Input = styled('input')({
  display: 'none',
});

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  }

  const handleSubmit = () => {
    apiAdminCreateCategory(categoryName)
      .then(res => {
        if (res?.data.statusCode === 200) {
          toast.error("Create category successfully!", options);
          setCategoryName('')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <Page title="Dashboard: Add product">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Create Category
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button component={Link} to="/dashboard/Categories" startIcon={<ArrowBackIosIcon />} variant="contained">
            BACK
          </Button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ pl: '24px' }}>
            <TextField
              id="categoryName"
              label="Category Name"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleChangeCategoryName}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ pl: '24px' }}>
          </Grid>
          <Grid item xs={3} sx={{ pr: '24px', mt: '10px' }}>
            <Button
              variant="contained"
              endIcon={<Iconify icon="eva:plus-fill" />}
              size="medium"
              component="span"
              onClick={handleSubmit}
            >
              ADD Category
            </Button>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
    </Page>
  );
}

export default CreateCategory;
