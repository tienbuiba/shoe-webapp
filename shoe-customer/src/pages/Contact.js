import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs, Button, Grid, TextField } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from 'src/components/Map';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';
import useResponsive from 'src/hooks/useResponsive';

const Contact = () => {
  const [subject, setSubject] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const smUp = useResponsive('up', 'sm');

  const form = React.useRef();
  var templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  const handleClick = (e) => {
    if (name !== '' && email !== '' && subject !== '' && message !== '') {
      dispatch(openLoadingApi());
      emailjs.send('service_nryc0it', 'template_cq86nyh', templateParams, '4fIiSEc_2JNSoSB1q')
        .then(function (response) {
          dispatch(closeLoadingApi());
          toast.success('We will send you our best offers, once a day', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setName('');
          setEmail('');
          setMessage('');
          setSubject('');
        }, function (error) {
          console.log('FAILED...', error);
          setName('');
          setEmail('');
          setMessage('');
          setSubject('');
        });
    }
    else {
      dispatch(closeLoadingApi());
      toast.error('Please enter value', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <Page title="Contact us">
      <Header />
      {!smUp ?
        <div className="newsletter" style={{ marginTop: '75px', marginBottom: '70px' }}>
          <div className="container">
            <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
        
            </div>
          </div>
        </div> :
        <div className="newsletter" style={{ marginTop: '150px', marginBottom: '70px' }}>
          <div className="container">
            <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
              <h3>
                {t("Contact")}
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
                  href="/contact"
                >
                  {t("Contact")}
                </Link>
              </Breadcrumbs>
            </div>
          </div>
        </div>
      }

      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title">
              <h2>{t("Contact")}</h2>
            </div>
          </div>
        </div>
        <Grid container spacing={4} sx={{ mb: 9, mt: 3 }}>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: '20px', color: '#999' }}>
              {t("Feel free to contact us. We&apos;ll be glad to hear from you, buddy")}.
            </p>
            <form ref={form} style={{ marginTop: '20px' }}>
              <Grid container spacing={2.8}>
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    id="Name"
                    label={t("Your name")}
                    name="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label={t("Your email")}
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="Subject"
                    label={t("Subject")}
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Enter your message here"
                    label={t("Enter your message here")}
                    type="text"
                    value={message}
                    multiline
                    rows={5.5}
                    onChange={e => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6} sx={{ flexDirection: 'row', alignItems: 'right', justifyContent: 'flex-end' }}>
                  <Button className="red_button" onClick={handleClick} variant="contained" size="large" sx={{ float: 'right', width: 100 }}>
                    {t("Submit Now")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Map />
          </Grid>
        </Grid>
      </div>
      <Footer />
      <ToastContainer />
    </Page>
  );
};

export default Contact;