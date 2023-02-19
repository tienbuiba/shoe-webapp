import { Breadcrumbs, Card, Grid, Paper, Link, Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Page from "src/components/Page";
import Footer from "src/layouts/Footer";
import Header from "src/layouts/Header";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { apiUserCheckOrderPaid } from "src/services/Payment";

const PaymentAutoBank = () => {
  const [money, setMoney] = useState("10000");
  const { code } = useParams();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(600);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const URL = 'https://img.vietqr.io/';
  const SubUrl = `image/mbbank-0376624470-compact2.jpg?amount=${money}\&addInfo=PAYMENT%20${code}\&accountName=BUI%20BA%20TIEN`

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => setSeconds(seconds - 1), 5000);
      return () => clearTimeout(timeoutId);
    } else {
      setSeconds('0');
    }
  }, [seconds]);

  useEffect(() => {
    apiUserCheckOrderPaid(code).then((res) => {
      if (res.data.data.isSuccess === true) {
        toast.success("Payment successfully!", options);
        navigate('/account-order');
      }
    })
  }, [seconds])

  return (
    <Page title="Payment information">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>Payment Banking</h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    HOME PAGE
                  </Link>
                  <p>Payment Banking</p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <Paper style={{ marginBottom: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <p style={{ color: '#000', fontSize: '22px', textAlign: 'center', marginBottom: '8px', fontWeight: 'bold', marginTop: '50px', paddingTop:'20px' }}>Chuyển khoản qua Ngân Hàng</p>
              <p style={{ textAlign: 'center', color: '#000', margin: '0px 30px' }}>Thực hiện chuyển khoản ngân hàng vào số tài khoản bên dưới. Vui lòng nhập đúng nội dung chuyển khoản và chờ ở trang này cho đến khi hệ thống báo thành công.</p>
            </div>
            <Grid container spacing={2} >
              <Grid item xs={12} md={5}>
                <Card sx={{ px: 4, py: 7, textAlign: 'center', boxShadow: '6px 6px 6px 6px rgb(0 0 0 / 20%)' }}>
                  <div style={{
                    backgroundColor: 'rgba(115, 103, 240, 0.12)',
                    color: '#28c76f',
                    width: '45px',
                    position: 'absolute',
                    top: 25,
                    right: 25,
                    borderRadius: '30%',
                  }}>Mới</div>
                  <div style={{ color: '#000', fontSize: '20px', display: 'inline-block', marginBottom: '8px', fontWeight: 'bold' }}>Cách 1:
                    <div style={{ color: '#000', fontSize: '18px', display: 'inline-block', marginLeft: '10px', }}>Chuyển khoản bằng mã QR</div>
                  </div>
                  <div style={{ color: '#000', fontSize: '12px', marginButton: '24px' }}>
                    Mở App Ngân hàng quét mã QRCode và nhập số tiền cần chuyển
                  </div>
                  <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                    <img src={`${URL + SubUrl}`} style={{ height: '450px' }} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={7} >
                <Card sx={{ px: 4, py: 7, textAlign: 'center', boxShadow: '6px 6px 6px 6px rgb(0 0 0 / 20%)' }}>
                  <div style={{
                    backgroundColor: 'rgba(115, 103, 240, 0.12)',
                    color: '#28c76f',
                    width: '80px',
                    position: 'absolute',
                    top: 25,
                    right: 25,
                    borderRadius: '30%',
                  }}>Phổ biến</div>
                  <div style={{ color: '#000', fontSize: '20px', display: 'inline-block', marginBottom: '8px', fontWeight: 'bold' }}>Cách 2:
                    <div style={{ color: '#000', fontSize: '18px', display: 'inline-block', marginLeft: '10px', }}>Chuyển khoản thủ công theo thông tin</div>
                  </div>
                  <div style={{ color: '#000', marginButton: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="../assets/images/mbbank.jpg" style={{ width: '200px', height: '150px' }} />
                  </div>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>Chủ tài khoản:
                    <div style={{ color: '#000', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>BÙI BÁ TIẾN</div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>Số tài khoản:
                    <div style={{ color: '#28c76f', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>0376624470</div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>Nội dung chuyển tiền:
                    <div style={{ color: 'red', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>PAYMENT {code}</div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>Ngân hàng:
                    <div style={{ color: '#000', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>MBBANK (MB)</div>
                  </div>
                  <Divider sx={{ marginBottom: '30px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '16px', display: 'inline-block', marginBottom: '8px', }}>Đang chờ chuyển khoản
                  </div>
                  <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                    <img src="../assets/images/loading.gif" style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', width: '100px', height: '100px' }} />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <Footer />
      <ToastContainer></ToastContainer>
    </Page >
  );
};


export default PaymentAutoBank;
