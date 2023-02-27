import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import Header from 'src/layouts/Header';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import MainNews from 'src/components/news/MainNews';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNewId } from 'src/redux/creates-action/NewAction';
import Top12Sell from './Top12Sell';
import NavTab from 'src/components/navtab/NavTab';

const HomePage = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNewId(''))
  })


  return (
    <Page title="Home Page">
      <div className="MainDiv">
        <Header />
        <div className="main_slider" style={{ backgroundImage: "url(assets/images/slider_1.jpg)" }}>
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content">
                  <h6>
                    {t("Spring / Summer Collection 2023")}
                  </h6>
                  <h1>
                    {t("Get up to 25% Off New Arrivals")}
                  </h1>
                  <div className="red_button shop_now_button"><Link to="/shop">
                    {t("shop now")}
                  </Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="benefit">
          <div className="container">
            <div className="row benefit_row">
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-truck" aria-hidden="true"></i></div>
                  <div className="benefit_content">
                    <h6>
                      {t("free shipping")}
                    </h6>
                    <p>
                      {t("For orders 500,000 VND")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-money" aria-hidden="true"></i></div>
                  <div className="benefit_content">
                    <h6>
                      {t("cach on delivery")}
                    </h6>
                    <p>
                      {t("Payment on delivery")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-undo" aria-hidden="true"></i></div>
                  <div className="benefit_content">
                    <h6>
                      {t("45 days return")}
                    </h6>
                    <p>
                      {t("Refund 1 to 1 exchange")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-clock-o" aria-hidden="true"></i></div>
                  <div className="benefit_content">
                    <h6>
                      {t("opening all week")}
                    </h6>
                    <p>
                      {t("8AM - 09PM")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new_arrivals">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>
                    {t("New Arrivals")}
                  </h2>
                </div>
              </div>
            </div>
            <NavTab />
          </div>
        </div>
        <div className="deal_ofthe_week">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="deal_ofthe_week_img">
                  <img src="assets/images/deal_ofthe_week.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 text-right deal_ofthe_week_col">
                <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                  <div className="section_title">
                    <h2>
                      {t("Deal Of The Week")}
                    </h2>
                  </div>
                  <div className="red_button deal_ofthe_week_button"><a href="/shop">
                  {t("shop now")}                  
                  </a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="best_sellers">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title new_arrivals_title">
                  <h2>
                    {t("top selling")}
                  </h2>
                </div>
              </div>
            </div>
            <Top12Sell />
          </div>
        </div>
        <div className="blogs">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title">
                  <h2>
                    {t("Latest Blogs")}
                  </h2>
                </div>
              </div>
            </div>
            <MainNews />
          </div>
        </div>
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
                <form action="post">
                  <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                    <input id="newsletter_email" type="email" placeholder="Your email" required="required" data-error="Valid email is required." />
                    <button id="newsletter_submit" type="submit" className="newsletter_submit_btn trans_300" value="Submit">
                      {t("subscribe")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Page>
  )
}
export default HomePage;