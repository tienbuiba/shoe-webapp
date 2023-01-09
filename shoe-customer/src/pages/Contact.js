import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs, Button, Container, Grid, TextField, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from 'src/components/Map';

const Contact = () => {
  const [subject, setSubject] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const form = React.useRef();
  var templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  const handleClick = (e) => {
    if (name !== '' && email !== '' && subject !== '' && message !== '') {
      emailjs.send('service_nryc0it', 'template_cq86nyh', templateParams, '4fIiSEc_2JNSoSB1q')
        .then(function (response) {
          toast.success('We will send you our best offers, once a day', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setName('')
          setEmail('')
          setMessage('')
          setSubject('')
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
          setName('')
          setEmail('')
          setMessage('')
          setSubject('')
        });
    }
    else {
      toast.error('Please enter value', {
        position: "top-center",
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
      <div className="newsletter" style={{ marginTop: '150px', marginBottom:  '70px' }}>
        <div className="container">
          <div className="row">
            <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
              <h3>CONTACT</h3>
              <Breadcrumbs aria-label="breadcrumb" >
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  HOME PAGE
                </Link>
                <p>CONTACT</p>
              </Breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title">
              <h2> CONTACT</h2>
            </div>
          </div>
        </div>
        <Grid container spacing={4} sx={{ mb: 9, mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", wordSpacing: '0.1' }}>
              Feel free to contact us.
              We&apos;ll be glad to hear from you, buddy.
            </Typography>
            <form ref={form} style={{ marginTop: '20px' }}>
              <Grid container spacing={2.8}>
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    id="Name"
                    label="Your name"
                    name="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Your email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Subject"
                    label="Subject"
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Enter your message here"
                    label="Enter your message here"
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={handleClick} variant="contained" size="large" sx={{ mt: 2 }}>
                    Submit Now
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Map
            />
          </Grid>
        </Grid>
      </div>
      <Footer />
      <ToastContainer />
    </Page>
  );
};

export default Contact;