import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import Page from '../Page';
import { apiUserGetAllListPosts } from 'src/services/News';

const MainNews = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const [dataPosts, setDataPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    apiUserGetAllListPosts(rowsPerPage, page, keyword).then(result => {
      setDataPosts(result.data.data.items)
    })
  }, [])

  console.log("hihi", dataPosts)

  return (
    <Page title="Home Page">
      <div className="MainDiv">
        <div className="row blogs_container">
          <div className="col-lg-4 blog_item_col">
            <div className="blog_item">
              <div className="blog_background" style={{ backgroundImage: "url(assets/images/blog_1.jpg)" }}></div>
              <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                <h4 className="blog_title">Here are the trends I see coming this fall</h4>
                <span className="blog_meta">by admin | dec 01, 2021</span>
                <a className="blog_more" href="#">Read more</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 blog_item_col">
            <div className="blog_item">
              <div className="blog_background" style={{ backgroundImage: "url(assets/images/blog_2.jpg)" }}></div>
              <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                <h4 className="blog_title">Here are the trends I see coming this fall</h4>
                <span className="blog_meta">by admin | dec 01, 2021</span>
                <a className="blog_more" href="#">Read more</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 blog_item_col">
            <div className="blog_item">
              <div className="blog_background" style={{ backgroundImage: "url(assets/images/blog_3.jpg)" }}></div>
              <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                <h4 className="blog_title">Here are the trends I see coming this fall</h4>
                <span className="blog_meta">by admin | dec 01, 2021</span>
                <a className="blog_more" href="#">Read more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
export default MainNews;