import Footer from "src/layouts/Footer";
import { Breadcrumbs, Button, Card, Container, Divider, Grid, Link, Typography } from "@mui/material";
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

const NewDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataPre, setDataPre] = useState([]);
  const dataNewId = useSelector(state => state.new.data);

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
      apiUserGetNewsById(id - 1).then((res) => {
        dispatch(closeLoadingApi());
        setDataPre(res?.data?.data);
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
      apiUserGetNewsById(id - 1).then((res) => {
        dispatch(closeLoadingApi());
        setDataPre(res?.data?.data);
      }).catch((err) => {
        console.log(err);
        dispatch(closeLoadingApi());
      })
    }
  }, [dataNewId])

  useEffect(() => {
    apiUserGetNewsCommentById(id).then((res) => {
      dispatch(closeLoadingApi());
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [])

  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState('');

  function fDateLocal(date) {
    return format(new Date(date), 'dd MMMM yyyy', { locale: vi })
  }

  const handleClick = () => {
    dispatch(setNewId(id - 1));
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
    setKeyword(e.target.value);
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
                    href="/#"
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
                      <img src={mainImage} alt={mainImage.filename} className="main-image-preview" />
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
              <Divider sx={{ mt: 3, mb: 1 }} />
              <Link to="" className="prePost" onClick={handleClick}>
                <span>
                  <i class="fa fa-chevron-left" style={{ marginRight: 4, fontSize: '14px' }}></i>
                  {dataPre.shortDesc}
                </span>
              </Link>
              <form style={{ marginTop: '20px', backgroundColor: 'rgba(0,0,0,0.05)', padding: '30px' }}>
                <Typography sx={{ mb: 3, color: "#000" }}> Tra Loi</Typography>
                <Grid container spacing={2.8}>
                  <Grid item xs={12} >
                    <input onChange={handleChange} value={keyword} className="form-control d-inline-block " placeholder="Binh Luan" />
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'flex-end' }}>
                    <Button className="red_button" onClick={handleClick} variant="contained" size="large" sx={{ float: 'right', width: 100 }}>
                      Binh Luan
                    </Button>
                  </Grid>
                </Grid>
              </form>
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




