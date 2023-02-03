import { Autocomplete, Breadcrumbs, Button, Divider, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Page from "src/components/Page";
import Footer from "src/layouts/Footer";
import Header from "src/layouts/Header";
import { apiUserCreateDeliveryAddress, apiUserGetCity, apiUserGetDeliveryAddress, apiUserGetDistrictByCity, apiUserGetWardByDistrict } from "src/services/Address";
import styled from "styled-components";
import SaveIcon from '@mui/icons-material/Save';
import { ToastContainer, toast } from 'react-toastify';
import PaymentInforProduct from "src/components/product/PaymentInforProduct";
import { Link } from "react-router-dom";

const PaymentInformation = () => {
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState(null);
  const [nameCity, setNameCity] = useState('');
  const [nameDistrict, setNameDistrict] = useState('');
  const [nameWard, setNameWard] = useState('');
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [detail, setDetail] = useState('');
  const [dataListAddress, setDataListAddress] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);
  const [call, setCall] = useState(false);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  useEffect(() => {
    apiUserGetCity().then((res) => {
      setCities(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if (cityId !== null) {
      apiUserGetDistrictByCity(cityId).then((res) => {
        setDistrict(res.data);
      }).catch((err) => {
        console.log(err)
      })
    } else {
      setNameDistrict(null);
      setNameWard(null);
    }
  }, [cityId])

  useEffect(() => {
    if (districtId !== null) {
      apiUserGetWardByDistrict(districtId).then((res) => {
        setWard(res.data);
      }).catch((err) => {
        console.log(err)
      })
    } else {
      setNameWard(null)
    }
  }, [districtId])

  useEffect(() => {
    apiUserGetDeliveryAddress().then((res) => {
      setDataListAddress(res.data.data);
      if (res.data.data.length > 0) {
        setHasAddress(true);
      } else {
        setHasAddress(false);
      }
    }).catch((err) => {
      console.log(err)
    })

  }, [call])

  const handleClick = () => {
    apiUserCreateDeliveryAddress(fullname, phone, cityId, wardId, districtId, detail).then((res) => {
      toast.success(res.data.message, options);
      setCall(!call);
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Page title="Payment information">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>Payment Information</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    to="/"
                  >
                    HOME PAGE
                  </Link>
                  <p>Cart</p>
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
              {hasAddress === true ? (
                <Grid item xs={8} sx={{ borderRight: '1px solid #E0E4E8', paddingRight: '20px', paddingTop: '20px' }}>
                  <div className="cart_heading" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                    <p className="cart-item-heading">THÔNG TIN THANH TOÁN</p>
                    <Link to="/update-delivery-address" className="address-change-heading" style={{ textAlign: 'end' }}>Đổi địa chỉ</Link>
                  </div>
                  <Grid container spacing={3} sx={{ my: 4 }}>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Full Name *</label>
                      <TextField
                        value={dataListAddress[0].fullname}
                        variant="filled"
                        disabled
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Số điện thoại *</label>
                      <TextField
                        value={dataListAddress[0].phone}
                        variant="filled"
                        disabled
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Tỉnh / Thành phố *</label>
                      <TextField
                        value={dataListAddress[0].city.name}
                        variant="filled"
                        disabled
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Quận / Huyện *</label>
                      <TextField
                        value={dataListAddress[0].district.name}
                        variant="filled"
                        disabled
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Phường / Xã *</label>
                      <TextField
                        value={dataListAddress[0].ward.name}
                        variant="filled"
                        disabled
                        filled
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Address detail *</label>
                      <TextField
                        value={dataListAddress[0].detail}
                        variant="filled"
                        disabled
                        fullWidth
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mb: 3 }}></Divider>
                </Grid>
              ) : (
                <Grid item xs={8} sx={{ borderRight: '1px solid #E0E4E8', paddingRight: '20px', paddingTop: '20px' }}>
                  <div className="cart_heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                    <p className="cart-item-heading">THÔNG TIN THANH TOÁN</p>
                  </div>
                  <Grid container spacing={3} sx={{ my: 4 }}>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Full Name *</label>
                      <TextField
                        value={fullname}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        variant="filled"
                        placeholder="Enter your name"
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Số điện thoại *</label>
                      <TextField
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        placeholder="Enter your phone"
                        variant="filled"
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Tỉnh / Thành phố *</label>
                      <FormControl fullWidth>
                        <Autocomplete
                          isOptionEqualToValue={(option, value) => {
                            return option.id === value?.id
                          }}
                          value={nameCity || null}
                          options={cities}
                          getOptionLabel={(option) => option.name}
                          onChange={(e, newValue) => {
                            setCityId(newValue === null ? null : newValue.id);
                            setDistrictId(null);
                            setWardId(null);
                            setNameCity(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} placeholder="Select City" variant="filled" />}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Quận / Huyện *</label>
                      <FormControl fullWidth>
                        <Autocomplete
                          isOptionEqualToValue={(option, value) => {
                            return option.id === value?.id
                          }}
                          value={nameDistrict || null}
                          options={district}
                          getOptionLabel={(option) => option.name}
                          onChange={(e, newValue) => {
                            setDistrictId(newValue === null ? null : newValue.id);
                            setWardId(null);
                            setNameDistrict(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} placeholder="Select District" variant="filled" />}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }} >
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Phường / Xã *</label>
                      <FormControl fullWidth>
                        <Autocomplete
                          isOptionEqualToValue={(option, value) => {
                            return option.id === value?.id
                          }}
                          value={nameWard || null}
                          options={ward}
                          getOptionLabel={(option) => option.name}
                          onChange={(e, newValue) => {
                            setWardId(newValue === null ? null : newValue.id);
                            setNameWard(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} placeholder="Select Ward" variant="filled" />}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ mb: 1 }}>
                      <label style={{ fontSize: '16px', fontWeight: '500', color: '#212529', fontFamily: 'Jost, sans-serif' }} >Address detail *</label>
                      <TextField
                        value={detail}
                        onChange={(e) => {
                          setDetail(e.target.value);
                        }}
                        variant="filled"
                        fullWidth
                        placeholder="Enter your address detail"
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mb: 3 }}></Divider>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                    <Button
                      style={{ width: '220px' }}
                      className="redOutlined_button_auth"
                      startIcon={<SaveIcon></SaveIcon>}
                      onClick={handleClick}
                    >
                      SAVE ADDRESS
                    </Button>
                  </div>
                </Grid>
              )}
              <Grid item xs={4} sx={{ p: '20px', border: '2px solid #e32124' }}>
                <div className="cart_heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                  <p className="cart-item-heading">ĐƠN HÀNG CỦA BẠN</p>
                </div>
                <Divider></Divider>
                <div className="cart-item">
                  <PaymentInforProduct hasAddress={hasAddress} dataListAddress={dataListAddress} />
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

export default PaymentInformation;
