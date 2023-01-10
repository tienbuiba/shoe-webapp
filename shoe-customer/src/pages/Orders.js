import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';

const Orders = () => {
  return (
    <Page title="News">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>SHOPPING CART</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    HOME PAGE
                  </Link>
                  <p>CARD</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '200px' }}>
        <div>
          <p>
            Chưa có sản phẩm nào trong giỏ hàng.
          </p>
          <button href="/" className="button_back_homepage">
            <a href="/">
              QUAY TRỞ LẠI CỬA HÀNG
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </Page>
  );
};

export default Orders;