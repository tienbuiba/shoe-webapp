import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import Page from '../Page';
import { apiUserGetAllListPosts } from 'src/services/News';
import { fDateLocal } from 'src/utils/formatTime';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { Card, Grid } from '@mui/material';

const NewComponent = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const [dataPosts, setDataPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const smUp = useResponsive('up', 'sm');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetAllListPosts(rowsPerPage, page, keyword).then(result => {
      setDataPosts(result.data.data.items);
      dispatch(closeLoadingApi());
    }).catch(err => {
      console.log(err);
      dispatch(closeLoadingApi());
    })
  }, [keyword]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <Page title="Home Page">
      <Grid container sx={{ mt: 10 }}>
        <Grid item xs={12} md={3}>
          <aside class="col-lg-12">
            <div className="mb-3">
              <input onChange={handleChange} value={keyword} className="form-control d-inline-block " placeholder="Search" />
            </div>
            <div id="aside_filter" class="collapse card d-lg-block mb-5">
              <article class="filter-group">
                <header class="card-header">
                  <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                    BÀI VIẾT MỚI
                  </a>
                </header>
                <div class="collapse show" id="collapse_aside1">
                  <div class="card-body">
                    <ul class="list-menu">
                      {dataPosts?.map((row) => {
                        return (
                          <Link to={`/new-detail/${row.id}`}
                            key={row.id}
                            className="nav-category"
                            style={{ color: '#000' }}
                          >
                            <li className="left-nav-new">
                              {row.shortDesc}
                            </li>
                          </Link>
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
          <Card sx={{ p: 2, borderRadius: '2px' }}>
            <div className="MainDiv">
              <div>
                <div className="row">
                  {dataPosts.map((dataPost) => {
                    return (
                      <div className="col-lg-4 blog_item_col">
                        <Link to={`/new-detail/${dataPost.id}`}>
                          <div className="blog_item">
                            <div className="blog_background" style={{ backgroundImage: `url(${dataPost.images[0]})` }}></div>
                            <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                              <h4 className="blog_title">{dataPost.shortDesc}</h4>
                              <span className="blog_meta">by admin |{fDateLocal(dataPost.createdAt)}</span>
                              <a className="blog_more" href="#">Read more </a>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}
export default NewComponent;