import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import Page from '../Page';
import { apiUserGetAllListPosts } from 'src/services/News';
import { fDateLocal } from 'src/utils/formatTime';
import { Card } from '@mui/material';

const MainNews = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const [dataPosts, setDataPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    apiUserGetAllListPosts(rowsPerPage, page, keyword).then(result => {
      setDataPosts(result.data.data.items)
    })
  }, []);

  return (
    <Page title="Home Page">
      <div className="MainDiv" style={{ marginTop: '75px' }}>
        <div>
          <div className="row blogs_container">
            {dataPosts.map((dataPost) => {
              return (
                <div className="col-lg-4 blog_item_col">
                  <Link to={`/new-detail/${dataPost.id}`}>
                    <div className="blog_item">
                      <div className="blog_background" style={{ backgroundImage: "url(assets/images/blog_1.jpg)" }}></div>
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
    </Page>
  )
}
export default MainNews;