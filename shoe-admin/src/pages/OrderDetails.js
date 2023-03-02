import { Button, Card, Container, Grid, Typography } from "@mui/material";
import Page from "src/components/Page";
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fDateTimeSuffix } from "src/utils/formatTime";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";
import { fNumber } from "src/utils/formatNumber";

const OrderDetails = () => {
  const data = useSelector(state => state.order.data);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data?.details.items.length > 0) {
      let total = 0;
      for (let i = 0; i < data?.details.items.length; i++) {
        total += data?.details.items[i].priceSell * data?.details.items[i].orderInfo.quantity;
      }
      setTotal(total);
    }
  }, [])

  return data.details.items && (
    <Page title={("Chi tiết đơn hàng")}>
      <Container maxWidth="xl">
        <Card sx={{ py:7, px:3}} style={{ marginTop: '50px', marginBottom: '100px' }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                Chi tiết đơn hàng
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                component={NavLink}
                variant="contained"
                style={{ width: '200px' }}
                className="redOutlined_button_auth"
                endIcon={<ChevronRightIcon></ChevronRightIcon>}
                to="/dashboard/orders"
              >
                Lịch sử đơn hàng
              </Button>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item xs={7.5} sx={{ paddingRight: '30px', paddingTop: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', paddingBottom: '8px' }}>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    SẢN PHẨM
                  </Typography>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    TỔNG CỘNG
                  </Typography>
                </div>
                <div>
                  <div>
                    {data.details.items.map((curElem) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ccc',
                            marginTop: '10px',
                            paddingBottom: '10px'
                          }}>
                          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                            <div>
                              <img src={curElem?.images[0]} alt={curElem.name} style={{ width: '75px', height: '75px', display: 'block', marginRight: '20px', boxShadow: "1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%), inset 0 0 0 1px rgb(0 0 0 / 5%);" }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <Typography style={{ color: '#000', fontSize: '12px', width: '235px', fontWeight: 500 }}>{curElem?.name}</Typography>
                              <div style={{ display: 'flex', alignItems: 'center', }}>
                                <div className="color-div" style={{ marginRight: '10px' }}>
                                  <Typography sx={{ marginRight: '4px', fontSize: '10px' }}>
                                    KÍCH CỠ:</Typography>
                                  <Typography sx={{ fontSize: '12px', color: '#000' }}>{curElem.orderInfo.size}</Typography>
                                </div>
                                <div className="color-div">
                                  <Typography sx={{ marginRight: '4px', fontSize: '10px' }}>
                                    MÀU SẮC
                                    :</Typography>
                                  <div
                                    className="color-style"
                                    style={{ backgroundColor: curElem.orderInfo.color, color: curElem.orderInfo.color, width: '20px', height:'20px', borderRadius: '20%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="cart-hide" style={{ textAlign: 'center' }}>
                          {fNumber(curElem?.priceSell)}
                            x {curElem.orderInfo.quantity}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={4.5} sx={{ p: '20px', boxShadow: "1px 1px 3px 0px rgb(0 0 0 / 20%), 0 1px 0 rgb(0 0 0 / 7%), inset 0 0 0 1px rgb(0 0 0 / 5%);", backgroundColor: "rgba(0,0,0,0.02)", marginTop: '10px' }}>
              <div>
                <Typography style={{ color: '#7a9c59', fontSize: '20px' }}>
                  Đơn đặt hàng của bạn đã được nhận
                </Typography>
              </div>
              <div className="cart_heading">
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    Mã đơn hàng
                    : </Typography>
                  <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                    {data.details.code}</Typography>
                </div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    Ngày
                    :</Typography>
                  <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                    {fDateTimeSuffix(data.details.createdAt)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    Tổng cộng
                    : </Typography>
                  <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                  {fNumber(total) }
                  </Typography>
                </div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px' }}>
                    Phương thức thanh toán
                    : </Typography>
                  <Typography style={{ color: '#000', fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>
                    {data.details.paymentMethod === "CASH" ?
                      "Thanh toán khi nhận hàng"
                      :
                      ("Chuyển khoản ngân hàng")
                    }
                  </Typography>
                </div>
                <div style={{ display: 'flex', padding: '10px 0' }}>
                  <Typography style={{ color: '#000', fontSize: '14px', width: '200px' }}>
                    {("Chuyển tới")}

                    : </Typography>
                  <Typography style={{ color: '#000', fontSize: '14px', fontWeight: '550', marginLeft: '4px' }}>
                    {data.details.address}
                  </Typography>
                </div>
                <div>
                </div>
                <ToastContainer></ToastContainer>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Wrapper>
      </Wrapper>
      <ToastContainer></ToastContainer>
    </Page>
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

export default OrderDetails;
