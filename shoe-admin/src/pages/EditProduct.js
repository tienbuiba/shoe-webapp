import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  TextField,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ImageList,
  ImageListItem,
  Card
} from '@mui/material';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { PhotoCamera } from '@mui/icons-material';
import { initEditProduct } from 'src/utils/InitProductForm';
import { uploadImage } from 'src/services/UploadImage';
import { apiAdminGetProductById, apiAdminUpdateProduct } from 'src/services/Products';
import { apiAdminGetAllCategories } from 'src/services/Categories';
import AddIcon from '@mui/icons-material/Add';
import TokenService from 'src/services/TokenService';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { API_URL } from 'src/constant/Constants';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Input = styled('input')({
  display: 'none',
});

function EditProduct() {
  const initStateProductForm = initEditProduct('', [], '', '', [], [], '', '', '', '', '', '', '', '');
  const [productForm, setProductForm] = useState(initStateProductForm);
  const [images, setImages] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const UPLOAD_ENDPOINT = 'upload-files/push';
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState(null);
  const [seconds, setSeconds] = useState(2);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetProductById(id).then((res) => {
      const result = res?.data?.data;
      setDataProduct(result);
      setImages(res?.data?.data.images);
      if (result) {
        setProductForm({
          ...productForm,
          name: result?.name,
          size: result?.size,
          priceOrigin: result?.priceOrigin,
          priceSell: result?.priceSell,
          color: result?.color,
          images: result?.images,
          shortDesc: result?.shortDesc,
          longDesc: result?.longDesc,
          categoryId: result?.categoryId,
          sold: result?.sold,
          available: result?.available,
          reviewCount: result?.reviewCount,
          ratingAvg: result?.ratingAvg,
          brand: result?.brand,
        });
      }
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      dispatch(closeLoadingApi());

    })
    apiAdminGetAllCategories(rowsPerPage, page, '')
      .then((res) => {
        setListCategory(res.data.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => setSeconds(seconds - 1), 2000);
      return () => clearTimeout(timeoutId);
    } else {
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    if (dataProduct !== null) {
      if (true) {
        setProductForm({
          ...productForm,
          name: dataProduct?.name,
          size: dataProduct?.size,
          priceOrigin: dataProduct?.priceOrigin,
          priceSell: dataProduct?.priceSell,
          color: dataProduct?.color,
          images: dataProduct?.images,
          shortDesc: dataProduct?.shortDesc,
          categoryId: dataProduct?.categoryId,
          sold: dataProduct?.sold,
          available: dataProduct?.available,
          reviewCount: dataProduct?.reviewCount,
          ratingAvg: dataProduct?.ratingAvg,
          brand: dataProduct?.brand,
        });
      }
    }
  }, [seconds])

  function uploadAdapter(loader) {
    const accessToken = TokenService.getLocalAccessToken();
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append('file', file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: 'post',
              body: body,
              headers: {
                "Authorization": accessToken,
              }
            })
              .then((res) => res.json())
              .then((res) => {
                console.log('Response from server: ', res);
                resolve({
                  default: res.data,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const handleChangeProductBrand = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      brand: data,
    });
  };
  const handleChangeProductName = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      name: data,
    });
  };
  const handleChangeProductPriceOrigin = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      priceOrigin: Number(data),
    });
  };

  const handleChangeProductPriceSell = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      priceSell: Number(data),
    });
  };

  const handleChangeProductSize = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      size: data.replace(' ', '').split(','),
    });
  };
  const handleChangeProductSold = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      sold: Number(data),
    });
  };

  const handleChangeProductAvailable = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      available: Number(data),
    });
  };

  const handleChangeProductColors = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      color: data.replace(' ', '').split(','),
    });
  };
  const handleChangeProductImages = (event) => {
    let data = event.target.files[0];
    uploadImage(data)
      .then((res) => {
        setImages([...images, res?.data?.data]);
        setProductForm({
          ...productForm,
          images: [...images, res?.data?.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeProductShortDesc = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      shortDesc: data,
    });
  };
  const handleChangeProductCategoryId = (event) => {
    let data = event.target.value;
    setProductForm({
      ...productForm,
      categoryId: data,
    });
  };

  const handleCKeditor = (event, editor) => {
    const data = editor.getData();
    setProductForm({
      ...productForm,
      longDesc: data,
    });
  };
  const handleRemoveImage = () => {
    setImages([]);
    setProductForm({
      ...productForm,
      images: []
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(openLoadingApi());
    apiAdminUpdateProduct(id, productForm)
      .then(res => {
        dispatch(closeLoadingApi());
        toast.success("Cập nhật sản phẩm thành công!", options);
        setImages([]);
        navigate(`/dashboard/products`);
        setProductForm({
          ...productForm,
          productName: '',
          productSize: [],
          priceOrigin: '',
          priceSell: '',
          productColors: [],
          productImages: [],
          productShortDesc: '',
          productLongDesc: '',
          productCategoryId: '',
          productSold: '',
          available: 1,
          reviewCount: 0,
          ratingAvg: 0,
          brand: ''
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(closeLoadingApi());
        if (err.response.data.statusCode === 401) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        } else if (err.response.data.statusCode === 400) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message[0], options);
        } else {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        }
      })
  };

  return (
    <Page title="Cập nhật thông tin sản phẩm mới">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          CHỈNH SỬA THÔNG TIN SẢN PHẨM
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button component={Link} color="info" to="/dashboard/products" startIcon={<ArrowBackIosIcon />} variant="contained">
            Quay lại          </Button>
          <Button component={Link} to={`/dashboard/product-detail/${id}`} startIcon={<VisibilityIcon />} variant="outlined">
            Xem sản phẩm
          </Button>
        </div>
        <Card sx={{ py: 4, px: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productName"
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                value={productForm.name}
                onChange={handleChangeProductName}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productBrand"
                label="Thương hiệu sản phẩm"
                placeholder="Nhập thương hiệu sản phẩm"
                value={productForm.brand}
                onChange={handleChangeProductBrand}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productPrice"
                label="Giá gốc sản phẩm"
                placeholder="Nhập giá gốc sản phẩm"
                value={productForm.priceOrigin}
                onChange={handleChangeProductPriceOrigin}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productPrice"
                label="Giá bán sản phẩm"
                placeholder="Nhập giá bán của sản phẩm"
                value={productForm.priceSell}
                onChange={handleChangeProductPriceSell}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productSize"
                label="Kích thước"
                placeholder="Nhập kích thước sản phẩm"
                value={productForm.size}
                onChange={handleChangeProductSize}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productColors"
                label="Màu sản phẩm"
                placeholder="Nhập màu sản phẩm"
                value={productForm.color}
                onChange={handleChangeProductColors}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productShortDsc"
                label="Mô tả ngắn về sản phẩm"
                placeholder="Nhập mô tả ngắn về sản phẩm"
                value={productForm.shortDesc}
                onChange={handleChangeProductShortDesc}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <FormControl fullWidth>
                <InputLabel id="product-category">Danh mục sản phẩm</InputLabel>
                <Select
                  labelId="product-category"
                  value={productForm.categoryId}
                  label="Chọn danh mục sản phẩm"
                  onChange={handleChangeProductCategoryId}
                >
                  {listCategory.map((item, id) => {
                    return (
                      <MenuItem key={id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productSold"
                label="Số sản phẩm đã bán"
                placeholder="Nhập số lượng sản phẩm đã bán"
                value={productForm.sold}
                onChange={handleChangeProductSold}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ pl: '24px' }}>
              <TextField
                id="productSold"
                label="Số sản phẩm còn lại"
                placeholder="Nhập số lượng sản phẩm còn trong kho"
                value={productForm.available}
                onChange={handleChangeProductAvailable}
                required
                fullWidth
              />
            </Grid>          
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <label htmlFor="contained-button-file-font">
                <Input
                  accept="image/*"
                  id="contained-button-file-font"
                  multiple
                  type="file"
                  onChange={handleChangeProductImages}
                />
                <Button
                  variant="outlined"
                  endIcon={<PhotoCamera></PhotoCamera>}
                  size="medium"
                  component="span"
                  color="error"
                >
                  Tải lên hình ảnh
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <ImageList sx={{ width: 500 }} cols={3} rowHeight={104}>
                {images.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      alt="img"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              {images.length > 0 ? (
                <div
                  onClick={handleRemoveImage}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: '5px',
                    color: '#000',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}><CloseIcon style={{
                    color: '#000',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}></CloseIcon>Xóa</div>
              ) : <div></div>
              }
            </Grid>
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <label>Mô tả dài sản phẩm: </label>
              <CKEditor
                id="editor"
                name="productLongDsc"
                editor={ClassicEditor}
                data={productForm.longDesc}
                onReady={(editor) => {
                  console.log('Editor is ready to use!', editor);
                }}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                onChange={handleCKeditor}
              />
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{ pr: '24px', mt: '30px' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon></AddIcon>}
              size="large"
              component="span"
              onClick={handleSubmit}
              color="error"
            >
              LƯU
            </Button>
          </Grid>
        </Card>
      </Container>
      <ToastContainer></ToastContainer>
    </Page>
  );
}

export default EditProduct;
