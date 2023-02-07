import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  ImageListItem,
  ImageList
} from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { PhotoCamera, Save } from '@mui/icons-material';
import { initPost } from 'src/utils/InitPostForm';
import { apiAdminGetPostById, apiAdminUpdatePostById } from 'src/services/Posts';
import TokenService from 'src/services/TokenService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadImage } from 'src/services/UploadImage';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const Input = styled('input')({
  display: 'none',
});

function EditPost() {
  const initStatePostForm = initPost('', [], '');
  const [postForm, setPostForm] = useState(initStatePostForm);
  const [images, setImages] = useState([]);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(openLoadingApi())
    apiAdminGetPostById(id).then((res) => {
      dispatch(closeLoadingApi());
      setData(res?.data?.data);
      setImages(res?.data?.data.images);
      setPostForm({
        ...postForm,
        shortDesc: res?.data?.data.shortDesc,
        images: res?.data?.data.images,
        longDesc: res?.data?.data.longDesc,
      });
    }).catch((err) => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [])

  useEffect(() => {
    dispatch(openLoadingApi())
    apiAdminGetPostById(id).then((res) => {
      dispatch(closeLoadingApi());
      setData(res?.data?.data);
      setImages(res?.data?.data.images);
      setPostForm({
        ...postForm,
        shortDesc: res?.data?.data.shortDesc,
        images: res?.data?.data.images,
        longDesc: res?.data?.data.longDesc,
      });
    }).catch((err) => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [])

  const API_URL = 'https://api.atroboticsvn.com';
  const UPLOAD_ENDPOINT = 'api/v1/upload-files/push';
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

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

  const handleChangePostShortDesc = (event) => {
    let data = event.target.value;
    setPostForm({
      ...postForm,
      shortDesc: data,
    });
  };

  const handleCKeditor = (event, editor) => {
    const data = editor.getData();
    setPostForm({
      ...postForm,
      longDesc: data,
    });
  };

  const handleChangeProductImages = (event) => {
    let data = event.target.files[0];
    uploadImage(data)
      .then((res) => {
        setImages([...images, res?.data?.data]);
        setPostForm({
          ...postForm,
          images: [...images, res?.data?.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveImage = () => {
    setImages([]);
    setPostForm({
      ...postForm,
      images: [],
    });
  }

  const handleSubmit = () => {
    apiAdminUpdatePostById(id, postForm)
      .then(res => {
        let shortDesc = '';
        let longDesc = '';
        setPostForm({
          ...postForm,
          shortDesc: shortDesc,
          images: [],
        });
        setPostForm({
          ...postForm,
          longDesc: longDesc,
        });
        setImages([]);
        toast.success('Update Post Successfully', options);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message[0], options);
      })
  };
  return (
    <Page title="Chỉnh sửa bài viết">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4 }}>
          CHỈNH SỬA BÀI VIẾT        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button component={Link} to="/dashboard/posts" startIcon={<ArrowBackIosIcon />} variant="contained">
            Quay lại          </Button>
          <Button component={Link} to={`/dashboard/post-detail/${id}`} startIcon={<VisibilityIcon />} variant="outlined">
            Xem bài viết
          </Button>
        </div>
        <Card sx={{ p: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <label>Mô tả ngắn bài viết:</label>
              <TextField
                id="productShortDsc"
                placeholder="Nhập mô tả ngắn bài viết"
                value={postForm.shortDesc}
                onChange={handleChangePostShortDesc}
                required
                fullWidth
                multiline
                rows={4}
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
                  Tải lên hình thu nhỏ
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
              {images.length === 1 ? (
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
              <label>Mô tả dài sản bài viết: </label>
              <CKEditor
                id="editor"
                name="postLongDsc"
                editor={ClassicEditor}
                data={postForm.longDesc}
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
          <Grid item xs={3} sx={{ pr: '24px', mt: '30px', }}>
            <Button
              variant="contained"
              endIcon={<Save></Save>}
              size="large"
              component="span"
              onClick={handleSubmit}
            >
              CẬP NHẬT BÀI VIẾT
            </Button>
          </Grid>
        </Card>
      </Container>
      <ToastContainer />
    </Page>
  );
}

export default EditPost;
