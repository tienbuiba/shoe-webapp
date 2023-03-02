import { Breadcrumbs, Card, Grid, Paper, Link, Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Page from "src/components/Page";
import Footer from "src/layouts/Footer";
import Header from "src/layouts/Header";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { apiUserCheckOrderPaid } from "src/services/Payment";
import FormatPrice from "src/utils/FormatPrice";
import { useTranslation } from "react-i18next";

const PaymentAutoBank = () => {
  const { code, amount } = useParams();
  const [money, setMoney] = useState("");
  const [codeOrder, setCodeOrder] = useState("");
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(600);
  const [textError, setTextError] = useState("")
  const { t } = useTranslation("translation");

  useEffect(() => {
    setMoney(amount);
    setCodeOrder(code);
  }, [])

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const URL = 'https://img.vietqr.io/';
  const SubUrl = `image/mbbank-0376624470-compact2.jpg?amount=${money}\&addInfo=PAYMENT%20${codeOrder}\&accountName=BUI%20BA%20TIEN`

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
      else if (Math.abs(res.data.data.modAmount) - (amount) < 1) {
        const moneyGave = Math.abs(res.data.data.modAmount);
        const continueAmount = amount - Math.abs(res.data.data.modAmount);
        setTextError(`  ${t("We received the amount:")} ${continueAmount}. ${t("Continue to pay the remaining amount:")} ${moneyGave}`)
      }
    })
  }, [seconds])

  return (
    <Page title={t("Bank transfer")}
    >
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>
                  {t("Payment Banking")}
                </h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    {t("HOME PAGE")}


                  </Link>
                  <p>
                    {t("Payment Banking")}

                  </p>
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
              <p style={{ color: '#000', fontSize: '22px', textAlign: 'center', marginBottom: '8px', fontWeight: '600', marginTop: '50px', paddingTop: '20px' }}>
                {t("Bank Transfer")}
              </p>
              <p style={{ textAlign: 'center', color: '#000', margin: '0px 30px' }}>
                {t("Make a bank transfer to the account number below. Please enter the correct transfer information and wait at this page until the system reports success.")}
              </p>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Card sx={{ px: 3, py: 4, textAlign: 'center', boxShadow: '6px 6px 6px 6px rgb(0 0 0 / 20%)' }}>
                  <div style={{
                    backgroundColor: 'rgba(115, 103, 240, 0.12)',
                    color: '#28c76f',
                    width: '45px',
                    position: 'absolute',
                    top: 25,
                    right: 25,
                    borderRadius: '30%',
                  }}>
                    {t("New")}
                  </div>
                  <div style={{ color: '#000', fontSize: '20px', display: 'inline-block', marginBottom: '8px', fontWeight: 'bold' }}>
                    {t("Method 1:")}
                    <div style={{ color: '#000', fontSize: '18px', display: 'inline-block', marginLeft: '10px', }}>
                      {t("Transfer by QR code")}
                    </div>
                  </div>
                  <div style={{ color: '#000', fontSize: '12px', marginButton: '24px' }}>
                    {t("Open the Banking App, scan the QRCode and enter the amount to transfer")}
                  </div>
                  <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                    <img src={`${URL + SubUrl}`} style={{ height: '450px' }} />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={7} >
                <Card sx={{ px: 3, py: 4, textAlign: 'center', boxShadow: '6px 6px 6px 6px rgb(0 0 0 / 20%)' }}>
                  <div style={{
                    backgroundColor: 'rgba(115, 103, 240, 0.12)',
                    color: '#28c76f',
                    width: '80px',
                    position: 'absolute',
                    top: 25,
                    right: 25,
                    borderRadius: '30%',
                  }}>
                    {t("Popular")}
                  </div>
                  <div style={{ color: '#000', fontSize: '20px', display: 'inline-block', marginBottom: '8px', fontWeight: 'bold' }}>
                    {t("Method 2:")}                                  <div style={{ color: '#000', fontSize: '18px', display: 'inline-block', marginLeft: '10px', }}>
                      {t("Manual transfer by information")}
                    </div>
                  </div>
                  <div style={{ color: '#000', marginButton: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={require('../_mock/mbbank.jpg')} alt="mbbank_logo" style={{ width: '200px', height: '150px' }} />
                  </div>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>
                    {t("Account holder:")}
                    <div style={{ color: '#000', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>BÙI BÁ TIẾN</div>
                  </div>

                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>
                    {t("Account number:")}
                    <div style={{ color: '#28c76f', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>0376624470</div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>
                    {t("Remittance Content:")}
                    <div style={{ color: 'red', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>PAYMENT {code}</div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px', }}>
                    {t("Amount to be transferred:")}
                    <div style={{ color: '#28c76f', fontSize: '16px', display: 'inline-block', marginLeft: '10px', fontWeight: 'bold' }}>
                      <FormatPrice price={money} />
                    </div>
                  </div>
                  <Divider sx={{ marginBottom: '8px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '14px', display: 'inline-block', marginBottom: '8px' }}>
                    {textError}
                  </div>
                  <Divider sx={{ marginBottom: '10px' }}></Divider>
                  <div style={{ color: '#000', fontSize: '16px', display: 'inline-block', marginBottom: '8px', }}>
                    {t("Waiting for transfer")}


                  </div>
                  <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                    <img src={require('../_mock/loading.gif')} alt="loading.gif" style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', width: '100px', height: '100px' }} />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <Footer />
      <ToastContainer></ToastContainer>
    </Page>
  );
};


export default PaymentAutoBank;
