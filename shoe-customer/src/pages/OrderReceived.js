import { Autocomplete, Breadcrumbs, Divider, FormControl, Grid, Link, Typography } from "@mui/material";
import Page from "src/components/Page";
import Footer from "src/layouts/Footer";
import Header from "src/layouts/Header";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';

const OrderReceived = () => {

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };
  // "SOD21676451283"

  return (
    <Page title="Order received">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>Order received</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    HOME PAGE
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/cart"
                  >
                    Cart
                  </Link>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Wrapper>
          <div className="container">
            <Grid container >
              <Grid item xs={8} sx={{ borderRight: '1px solid #E0E4E8', paddingRight: '20px', paddingTop: '20px' }}>
                <div className="cart_heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                  <p className="cart-item-heading">Chi tiết đơn hàng</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      SẢN PHẨM</Typography>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      TỔNG</Typography>
                  </div>
                  <div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', padding: '15px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px', width: '250px' }}>
                    Tổng
                  </Typography>
                </div>
                <Divider sx={{ mb: 3 }}></Divider>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                </div>
              </Grid>
              <Grid item xs={4} sx={{ p: '20px', boxShadow: "1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%), inset 0 0 0 1px rgb(0 0 0 / 5%);", backgroundColor: "rgba(0,0,0,0.02)" }}>
                <div>
                  <Typography style={{ color: '#7a9c59', fontSize: '16px' }}>
                    Cảm ơn bạn. Đơn hàng của bạn đã được nhận. </Typography>
                </div>
                <div className="cart_heading">
                  <div style={{ display: 'flex', padding: '10px 0' }}>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      Mã đơn hàng: </Typography>
                    <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                      1772</Typography>
                  </div>
                  <div>
                  </div>
                  <div style={{ display: 'flex', padding: '10px 0' }}>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      Ngày:</Typography>
                    <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                      Ngày: 1 Tháng Hai, 2023
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', padding: '10px 0' }}>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      Tổng cộng: </Typography>
                    <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                      299,000₫
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', padding: '10px 0' }}>
                    <Typography style={{ color: '#000', fontSize: '14px' }}>
                      Phương thức thanh toán: </Typography>
                    <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                      Chuyển khoản ngân hàng
                    </Typography>
                  </div>
                  <div>
                  </div>
                  <ToastContainer></ToastContainer>
                </div>
              </Grid>
            </Grid>
          </div>
        </Wrapper>
      </div>
      <Footer />
      <ToastContainer></ToastContainer>
    </Page >
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;
  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }
  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
  }
  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      .color-style {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    .btn-clear {
      background-color: #e74c3c;
    }
  }

  @media (max-width: 768) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }
    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }
    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;
      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default OrderReceived;
