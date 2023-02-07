import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fDateLocal } from 'src/utils/formatTime';

const theme = createTheme();
export default function MainPost(props) {
  const dispatch = useDispatch();
  const { data } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={2}>
            {data?.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: '90%' }}
                    image={card.images === null ? `https:source.unsplash.com/random` : card.images}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2"
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: '#000', fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: '1.6'
                      }}
                    >
                      {card.shortDesc}
                    </Typography>
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
                      marginBottom: '10px',
                    }}>
                      POSTED ON
                      <span style={{
                        fontSize: '10px',
                        color: '#000',
                        marginRight: '5px',
                        marginLeft: '5px'
                      }}>
                        {card.createdAt && (
                          fDateLocal(card?.createdAt)
                        )}
                      </span>,
                      BY ADMIN
                    </div>
                  </CardContent>
                  <CardActions sx={{ display: 'flex', gap: '20px' }}>
                    <Button
                      size="small"
                      variant='contained'
                      color="info"
                      component={Link}
                      to={`/dashboard/post-detail/${card.id}`
                      }
                      startIcon={<VisibilityIcon></VisibilityIcon>}
                    >
                      Xem
                    </Button>
                    <Button
                      size="small"
                      variant='contained'
                      color="success"
                      component={Link} to={`/dashboard/edit-post/${card.id}`}
                      startIcon={<EditIcon></EditIcon>}
                    >
                     Sửa
                    </Button>
                    <Button size="small"
                      variant='contained'
                      color="error"
                      onClick={(e) => dispatch(showConfirmModal('Are you sure?', 'Do you want to delete this post?', card.id, "DELETE_POST"))}
                      startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
                    >
                      Xóa
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}