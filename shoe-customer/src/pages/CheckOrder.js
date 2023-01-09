import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';

const CheckOrder = () => {
  return (
    <Page title="Check order">
      <Header />
      <div className="main_slider_checkorder" style={{ backgroundImage: "url(static/banner-checkorder.jpg)" }}>
        <div className="container fill_height">
          <div className="row align-items-center fill_height justify-content-center text-center">
            <div className="col">
              <div className="main_slider_content text-center">
                <h4 style={{ color: '#fff' }}>TRA CỨU HÀNH TRÌNH ĐƠN HÀNG</h4>
                <p style={{ color: '#fff' }}>"Mạng chuyển phát nhanh rộng khắp"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter_checkorder">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    HOME PAGE
                  </Link>
                  <p>CHECK ORDER</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '200px' }}></div>
      <Footer />
    </Page>
  );
};

export default CheckOrder;