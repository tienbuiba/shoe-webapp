import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Card
} from '@mui/material';
import { useState } from 'react';
import Page from '../components/Page';
import { styled } from '@mui/material/styles';
import { Save } from '@mui/icons-material';
import { initPost } from 'src/utils/InitPostForm';
import { apiAdminCreatePost } from 'src/services/Posts';
import TokenService from 'src/services/TokenService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = styled('input')({
  display: 'none',
});

function CreatePost() {
  const initStatePostForm = initPost('', '');
  const [postForm, setPostForm] = useState(initStatePostForm);
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

  const handleSubmit = () => {
    apiAdminCreatePost(postForm)
      .then(res => {
        toast.success('Create Post Successfully', options);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <Page title="Dashboard: Add Post">
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Create New Post
        </Typography>
        <Card sx={{ p: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <label>Post Short Description:</label>
              <TextField
                id="productShortDsc"
                placeholder="Enter post short description"
                value={postForm.shortDesc}
                onChange={handleChangePostShortDesc}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{ pl: '24px' }}>
              <label>Post Long Description: </label>
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
          <Grid item xs={3} sx={{ pr: '24px', mt: '10px' }}>
            <Button
              variant="contained"
              endIcon={<Save></Save>}
              size="medium"
              component="span"
              onClick={handleSubmit}
            >
              Create Post
            </Button>
          </Grid>
        </Card>
      </Container>
      <ToastContainer />
    </Page>
  );
}

export default CreatePost;
