import { Breadcrumbs, Button, Divider, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Page from "src/components/Page";
import Footer from "src/layouts/Footer";
import Header from "src/layouts/Header";
import { apiUserGetAllCartItem } from "src/services/Carts";
import styled from "styled-components";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from "react-router-dom";
import CartTotalItem from "../components/cart/CartTotalItem";
import CartItem from "../components/cart/CartItem";
import { useTranslation } from "react-i18next";
import useResponsive from "src/hooks/useResponsive";

const Cart = () => {
  const [dataCart, setDataCart] = useState([]);
  const dataAddToCart = useSelector(state => state.cart.data);
  const [hasCart, setHasCart] = useState(false);
  const [total, setTotal] = useState(0);
  const { t } = useTranslation("translation");
  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    apiUserGetAllCartItem().then((res) => {
      setDataCart(res.data.data);
      if (res.data.data?.length > 0) {
        let total = 0;
        for (let i = 0; i < res.data.data.length; i++) {
          total += res.data.data[i].product.priceSell * res.data.data[i].quantity;
        }
        setTotal(total);
        setHasCart(true);
      } else {
        setHasCart(false);
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [dataAddToCart])

  return dataCart && (
    <Page title={t("Cart")}
    >
      <Header />
      {!smUp ? <div className="newsletter" style={{ marginTop: '75px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>
                  {t("Cart Shopping")}
                </h3>            
              </div>
            </div>
          </div>
        </div>
      </div> :
        <div className="newsletter" style={{ marginTop: '150px' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h3>
                    {t("Cart Shopping")}
                  </h3>
                  <Breadcrumbs aria-label="breadcrumb" >
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/"
                    >
                      {t("HOME PAGE")}
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/cart"
                    >
                      {t("Cart")}
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>}

      <div>
        {hasCart === true ? (<>
          <Wrapper>
            <div className="container">
              <Grid container>
                <Grid item xs={12} md={8} sx={{ borderRight: '1px solid #E0E4E8', paddingRight: '20px' }}>
                  <div className="cart_heading" style={{ display: 'grid', gridTemplateColumns:  `${!smUp ? '' : 'repeat(5, 1fr)'}` }}>
                    <p className="cart-item-heading">
                      {t("Item")}

                    </p>
                    <p className="cart-price-heading">

                      {t("Price")}
                    </p>
                    <p className="cart-quantity-heading">
                      {t("Quantity")}

                    </p>
                    <p className="cart-subtotal-heading">
                      {t("Subtotal")}
                    </p>
                  </div>
                  <Divider></Divider>
                  <div className="cart-item">
                    {dataCart.map((curElem) => {
                      return <CartItem key={curElem.id} {...curElem}
                      />;
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                    <Button
                      style={{ width: '280px' }}
                      className="redOutlined_button_auth"
                      component={NavLink}
                      to="/shop"
                      startIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
                    >
                      {t("CONTINUE VIEWING PRODUCTS")}
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ paddingLeft: '20px' }}>
                  <div className="cart_heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                    <p className="cart-item-heading">
                      {t("TOTAL")}
                    </p>
                  </div>
                  <Divider></Divider>
                  <div className="cart-item">
                    <CartTotalItem total={total} />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Wrapper>
        </>) : (<>
          <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `${!smUp ? '150px 50px' : '200px'}` }}>
            <div>
              <p>
                {t("There are no products in the shopping cart.")}
              </p>
              <Button
                style={{ width: '250px' }}
                className="redOutlined_button_auth"
                component={NavLink}
                to="/shop"
                startIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}>
                {t("BACK TO THE STORE")}
              </Button>
            </div>
          </div>
        </>)}
      </div>
      <Footer />
    </Page>
  );
};

const Wrapper = styled.section`
  padding: 7rem 0;

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
    gap: 2rem;
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

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
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

export default Cart;
