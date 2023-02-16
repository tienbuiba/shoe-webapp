import Footer from "src/layouts/Footer";
import { Avatar, Breadcrumbs, Button, Card, Container, Divider, Grid, Link, Typography } from "@mui/material";
import Header from "src/layouts/Header";
import Page from "src/components/Page";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUserGetAllListPosts, apiUserGetNewsById, apiUserGetNewsCommentById } from "src/services/News";
import { closeLoadingApi, openLoadingApi } from "src/redux/creates-action/LoadingAction";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestIcon, PinterestShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { setNewId } from "src/redux/creates-action/NewAction";
import { urlWebsite } from "src/constants/Constant";
import { apiUserCommentPostById, apiUserCreateComment, apiUserEditCommentById } from "src/services/Comment";
import { deleteCommentPost } from "src/redux/creates-action/CommentAction";
import TokenService from "src/services/TokenService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


const NewDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const dataNewId = useSelector(state => state.new.data);
  const [content, setContent] = useState('');
  const [contentEdit, setContentEdit] = useState('');
  const [dataComment, setDataComment] = useState([]);
  const deletecmtPost = useSelector(state => state.comment.data);
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(openLoadingApi())
    if (dataNewId.id !== '') {
      const id = dataNewId.id;
      apiUserGetNewsById(id).then((res) => {
        dispatch(closeLoadingApi());
        setData(res?.data?.data);
        setMainImage(res?.data?.data?.images[0]);
      }).catch((err) => {
        console.log(err);
        dispatch(closeLoadingApi());
      })
    } else {
      apiUserGetNewsById(id).then((res) => {
        dispatch(closeLoadingApi());
        setData(res?.data?.data);
        setMainImage(res?.data?.data?.images[0]);
      }).catch((err) => {
        console.log(err);
        dispatch(closeLoadingApi());
      })
    }
  }, [dataNewId])

  useEffect(() => {
    apiUserGetNewsCommentById(id).then((res) => {
      dispatch(closeLoadingApi());
      setDataComment(res?.data?.data)
    }).catch((err) => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [deletecmtPost])

  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState('');

  function fDateLocal(date) {
    return format(new Date(date), 'dd MMMM yyyy hh:mm', { locale: vi })
  }

  const [dataPosts, setDataPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(40);

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetAllListPosts(rowsPerPage, page, keyword).then(result => {
      dispatch(closeLoadingApi());
      setDataPosts(result.data.data.items);
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [keyword])

  const handleChange = (e) => {
    setContent(e.target.value);
  }

  return data && (
    <Page title="New detail">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3> News Details</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    HOME PAGE
                  </Link>
                  <p>NEWS</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container  >
          <Grid item xs={12} md={3}>
            <aside class="col-lg-12">
              <div className="mb-3">
                <input onChange={handleChange} value={keyword} className="form-control d-inline-block " placeholder="Search" />
              </div>
              <div id="aside_filter" class="collapse card d-lg-block mb-5">
                <article class="filter-group">
                  <header class="card-header">
                    <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                      BÀI VIẾT LIÊN QUAN
                    </a>
                  </header>
                  <div class="collapse show" id="collapse_aside1">
                    <div class="card-body">
                      <ul class="list-menu">
                        {dataPosts?.map((row) => {
                          return (
                            <div
                              key={row.id}
                              className="nav-category"
                              onClick={() => { dispatch(setNewId(row.id)) }}
                            >
                              <li className="left-nav-new">
                                {row.shortDesc}
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card className="container" sx={{ px: 2, py: 3 }}>
              <div style={{ color: '#000', fontSize: '16px', marginBottom: '12px', fontWeight: '550', }}>TIN TỨC</div>
              <div style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', lineHeight: '1.6' }}>{data.shortDesc}</div>
              <div style={{
                height: '3px',
                display: 'block',
                backgroundColor: 'rgba(0,0,0,0.3)',
                margin: ' 1em 0 1em',
                width: '100%',
                maxWidth: '30px',
                marginBottom: '20px'
              }}>
              </div>
              <div style={{
                fontSize: '10px',
                color: '#000',
                marginBottom: '30px'
              }}>
                POSTED ON
                <span style={{
                  fontSize: '10px',
                  color: '#000',
                  marginRight: '5px',
                  marginLeft: '5px',
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
                      <img src={mainImage} alt={mainImage.filename} style={{ height: '50%', display: 'block' }} />
                    </div>
                  </div>
                </div>
              </div>
              <p dangerouslySetInnerHTML={{ __html: data.longDesc }} style={{ paddingTop: '50px', color: '#000', fontSize: '14px' }} />
              <div style={{ display: 'flex', gap: '14px', marginTop: '30px' }}>
                <FacebookShareButton
                  url={urlWebsite}
                  quote={data.shortDesc}
                  hashtag="#shoe"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={urlWebsite}
                  quote={data.shortDesc}
                  hashtag="#shoe"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <PinterestShareButton
                  url={urlWebsite}
                  quote={data.shortDesc}
                  hashtag="#shoe"
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>

                <WhatsappShareButton
                  url={urlWebsite}
                  quote={data.shortDesc}
                  hashtag="#shoe"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <Divider sx={{ mt: 3}} />         
              {dataComment?.length > 0 ?
                <div style={{backgroundColor: 'rgba(0,0,0,0.05)', marginTop: '30px', padding: '50px 0px 0px 20px'}}>
                  <Grid container>
                    <Grid item xs={7} sx={{ paddingRight: '20px'}}>
                      <h4 style={{ color: '#000', marginBottom: '20px' }}>Recent Comments</h4>
                      {dataComment?.map(item => {
                          return (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: `${edit === false ? 'center' : 'flex-start'}`,
                                justifyContent: 'space-between',
                                flexDirection: `${edit === false ? 'row' : 'column'}`,
                                border: '1px solid #ccc',
                                padding: '10px 15px',
                                width: '100%',
                                borderRadius: '5px',
                                marginBottom: '20px'
                              }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <Avatar src={item.user.avatarUrl} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <div style={{ color: '#428bca', fontSize: '16px' }}>{item.content}</div>
                                  <div style={{ fontSize: '12px' }}>
                                    By:
                                    <span style={{ color: '#428bca', margin: '0 5px' }}>
                                      {item.user.username}
                                    </span>
                                    {fDateLocal(item.createdAt)}</div>
                                </div>
                              </div>
                              {item?.userId === profile?.id ?
                                (<div>
                                  {edit === true ? (
                                    <div style={{ marginTop: '10px' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label htmlFor="message">Message</label>
                                        <CloseIcon size="small" onClick={() => { setEdit(false) }} sx={{ fontSize: '14px', cursor: 'pointer' }} />
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <input value={contentEdit} onChange={(e) => { setContentEdit(e.target.value) }} className="form-control d-inline-block" />
                                        <Button
                                          variant="contained"
                                          className="yellow_button_auth"
                                          onClick={() => {
                                            apiUserEditCommentById(item.id, contentEdit).then(res => {
                                              setEdit(false);
                                              dispatch(deleteCommentPost());
                                              setContent('');
                                              setContentEdit('');
                                            }).catch(err => {
                                              console.log(err);
                                            })
                                          }}>Edit</Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div style={{ display: 'flex', alignItem: 'center', gap: '10px' }}>
                                      <EditIcon
                                        color="infor"
                                        sx={{ cursor: 'pointer', fontSize: '16px' }}
                                        onClick={() => {
                                          setEdit(true);
                                        }} />
                                      <DeleteIcon
                                        color="error"
                                        sx={{ cursor: 'pointer', fontSize: '16px' }}
                                        onClick={() => {
                                          apiUserCommentPostById(item.id).then((res) => {
                                            dispatch(deleteCommentPost());
                                          }).catch(err => {
                                            console.log(err);
                                          })
                                        }}
                                      />
                                    </div>
                                  )
                                  }
                                </div>
                                ) : (<div></div>)}
                            </div>)
                        })
                      }
                    </Grid>
                    <Grid item xs={5} sx={{ border: '1px solid #ccc', padding: '20px 0px 20px 20px', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.05)'}}>
                      <div >
                        <h4>Leave a comment</h4>
                        <label htmlFor="message">Message</label>
                        <textarea value={content} onChange={handleChange} rows={5} className="form-control d-inline-block " />
                      </div>
                      <div >
                        <Button
                          variant="contained"
                          className="yellow_button_auth"
                          onClick={() => {
                            apiUserCreateComment(id, content).then(res => {
                              dispatch(deleteCommentPost());
                              setContent('');
                            }).catch(err => {
                              console.log(err);
                            })
                          }}>Post Comment</Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                :
                <>
                  <div style={{ marginTop: '20px', backgroundColor: 'rgba(0,0,0,0.05)', padding: '30px' }}>
                    <form id="algin-form">
                      <div className="form-group">
                        <h4>Leave a comment</h4>
                        <label htmlFor="message">Message</label>
                        <textarea value={content} onChange={handleChange} rows={5} className="form-control d-inline-block " />
                      </div>
                      <div className="form-group">
                        <Button
                          size="large"
                          variant="contained"
                          className="yellow_button_auth"
                          onClick={() => {
                            apiUserCreateComment(id, content).then(res => {
                              dispatch(deleteCommentPost());
                              setContent('');
                            }).catch(err => {
                              console.log(err);
                            })
                          }}>Post Comment</Button>
                      </div>
                    </form>
                  </div>
                </>
              }
            </Card>
          </Grid>
        </Grid>
      </Container>
      <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h4>Newsletter</h4>
                <p>Subscribe to our newsletter and get 20% off your first purchase</p>
              </div>
            </div>
            <div className="col-lg-6">
              <form action="post">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                  <input id="newsletter_email" type="email" placeholder="Your email" required="required" data-error="Valid email is required." />
                  <button id="newsletter_submit" type="submit" className="newsletter_submit_btn trans_300" value="Submit">subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  );
};

export default NewDetail;




