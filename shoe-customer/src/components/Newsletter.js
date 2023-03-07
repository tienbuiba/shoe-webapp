import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Newsletter = () => {
  const { t } = useTranslation("translation");
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  var templateParams = {
    name: "User",
    email: email,
    subject: "Subcribe",
    message: "Newsletter"
  };
  const handleClick = (e) => {
    if (email !== '') {
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
          setEmail('');
        }, function (error) {
          console.log('FAILED...', error);
          setEmail('');
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
    <div>
      <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h4>
                  {t("Newsletter")}
                </h4>
                <p>
                  {t("Subscribe to our newsletter and get 20% off your first purchase")}
                </p>
              </div>
            </div>
            <div className="col-lg-6">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                  <input id="newsletter_email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" required="required" data-error="Valid email is required." />
                  <button id="newsletter_submit" type="submit" onClick={handleClick} className="newsletter_submit_btn trans_300" value="Submit">
                    {t("subscribe")}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Newsletter;