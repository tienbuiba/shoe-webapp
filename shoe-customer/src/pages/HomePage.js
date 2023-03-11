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
import Newsletter from 'src/components/Newsletter';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container } from '@mui/system';

const HomePage = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNewId(''))
  })

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Page title={t("Home Page")}>
      <div className="MainDiv ">
        <Header />
        <Container maxWidth="xl" style={{ height: `${!smUp ? '150px' : '500px'}`, marginTop: `${!smUp ? '75px' : '150px'}`, display: 'block' }} >
          <Slider {...settings} >
            <img src={require("../_mock/slider_1.webp")} style={{ height: `${!smUp ? '250px !important' : '500px !important'}`, display: 'block' }} />
            <img src={require("../_mock/slider_4.webp")} style={{ height: `${!smUp ? '250px !important' : '500px !important'}`, display: 'block' }} />
            <img src={require("../_mock/slider_2.webp")} style={{ height: `${!smUp ? '250px !important' : '500px !important'}`, display: 'block' }} />
            <img src={require("../_mock/slider_3.webp")} style={{ height: `${!smUp ? '250px !important' : '500px !important'}`, display: 'block' }} />
          </Slider>
        </Container>
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
              <div className="col-md-6">
                <div className="deal_ofthe_week_img">
                  <img src="assets/images/deal_the_week.png" alt="" />
                </div>
              </div>
              <div className="col-md-6 text-right deal_ofthe_week_col">
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
        <div class="hotline-phone-ring-wrap">
          <div class="hotline-phone-ring">
            <div class="hotline-phone-ring-circle"></div>
            <div class="hotline-phone-ring-circle-fill"></div>
            <div class="hotline-phone-ring-img-circle">
              <a href="tel:0986909682" class="pps-btn-img">
                <img src={require("../_mock/icon-call.png")} alt="Gọi điện thoại" width="50" />
              </a>
            </div>
          </div>
          <div class="hotline-bar">
            <a href="tel:0986909682">
              <span class="text-hotline">0986.909.682</span>
            </a>
          </div>
        </div>
        <Newsletter />
      </div>
      <Footer />
    </Page>
  )
}
export default HomePage;