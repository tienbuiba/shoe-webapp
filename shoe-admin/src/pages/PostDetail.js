import { Button, Card, Container, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { apiAdminGetPostById } from 'src/services/Posts';
import { fDateLocal } from 'src/utils/formatTime';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openLoadingApi())
    apiAdminGetPostById(id).then((res) => {
      dispatch(closeLoadingApi());
      setData(res?.data?.data);
    }).catch((err) => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [])

  return (
    <Container maxWidth="lg">
      <Card sx={{ py: 4, px: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button component={Link} to="/dashboard/posts" startIcon={<ArrowBackIosIcon />} variant="contained">
            BACK
          </Button>
          <Button component={Link} to={`/dashboard/edit-post/${id}`} startIcon={<EditIcon />} variant="outlined">
            EDIT
          </Button>
        </div>
        <div style={{ color: '#000', fontSize: '14px', marginBottom: '12px' }}>TIN TỨC</div>
        <div style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', lineHeight: '1.6' }}>{data.shortDesc}</div>
        <div style={{
          height: '3px',
          display: 'block',
          backgroundColor: 'rgba(0,0,0,0.9)',
          margin: ' 1em 0 1em',
          width: '100%',
          maxWidth: '30px'
        }}>
        </div>
        <div style={{
          fontSize: '10px',
          color: '#000',
          marginBottom: '30px',
        }}>
          POSTED ON
          <span style={{
            fontSize: '10px',
            color: '#000',
            marginRight: '5px',
            marginLeft: '5px'
          }}>
            {data.createdAt && (
              fDateLocal(data?.createdAt)
            )}
          </span>,
          BY ADMIN
        </div>
        <div>
          <div className="product_images">
            <div>
              <div className="main-screen">
                {/* <img src={data.images[0]} alt={'filename'} className="main-image-preview"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} /> */}
              </div>
            </div>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: data.longDesc }} />
        <Divider sx={{ mt: 3}} />
        <div style={{
          fontSize: '10px',
          color: '#000',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          UPDATE AT
          <span style={{
            fontSize: '10px',
            color: '#000',
            marginRight: '5px',
            marginLeft: '5px'
          }}>
            {data.updatedAt && (
              fDateLocal(data?.updatedAt)
            )}
          </span>,
          BY ADMIN
        </div>
      </Card>
    </Container>
  );
};

export default PostDetail;