import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import MainProduct from 'src/components/shop/MainProduct';
import Footer from 'src/layouts/Footer';

const Shop = () => {
  return (
    <Page title="Shop">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>Shop</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    HOME PAGE
                  </Link>
                  <p>SHOP</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainProduct />
      <div style={{ marginBottom: '100px' }}></div>
      <Footer />
    </Page>
  );
};

export default Shop;