import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';

const ProductDetail = () => {
  return (
    <Page title="Product detail">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>PRRODUCT DETAIL</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    HOME PAGE
                  </Link>
                  <p>Product detail</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '200px' }}>
      
      </div>
      <Footer />
    </Page>
  );
};

export default ProductDetail;