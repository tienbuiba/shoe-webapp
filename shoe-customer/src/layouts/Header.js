import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import LanguagePopover from './LanguagePopover';
import AccountPopover from './AccountMenu';
import TokenService from 'src/services/TokenService';
import { apiUserGetAllCartItem } from 'src/services/Carts';
import { useSelector } from 'react-redux';
import useScript from 'src/hooks/useScript';

const Header = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');
  const token = localStorage.getItem('accessToken');
  useScript('../assets/js/jquery-3.2.1.min.js');
  useScript('../assets/js/popper.js');
  useScript('../assets/js/bootstrap.min.js');
  useScript('../assets/js/isotope.pkgd.min.js');
  useScript('../assets/js/custom.js');
  useScript('../assets/js/easing.js');

  const [dataCart, setDataCart] = useState([]);
  const dataAddToCart = useSelector(state => state.cart.data);

  useEffect(() => {
    apiUserGetAllCartItem().then((res) => {
      setDataCart(res.data.data);
    }).catch((err) => {
      console.log(err)
    })
  }, [dataAddToCart])

  const handleLogout = () => {
    TokenService.removeAccessToken();
    TokenService.removeLocalExpiresIn();
    TokenService.removeLocalProfile();
    navigate('/', { replace: true });
  };

  return (
    <div className="MainDiv">
      <header className="header trans_300">
        <div className="top_nav">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="top_nav_left">
                  {t("HOME: 319 - C16 Ly Thuong Kiet, Ward 15, District 11, HCMC")}
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="top_nav_right">
                  <ul className="top_nav_menu">
                    <li className="language">
                      <a href="#">
                        <LanguagePopover />
                        <i className="fa fa-angle-down">
                        </i>
                      </a>
                    </li>
                    {token ? <>
                      <li className="account">
                        <a href="#">
                          {t("My Account")}
                          <i className="fa fa-angle-down"></i>
                        </a>
                        <ul className="account_selection">
                          <li><a onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true" style={{ marginRight: '2px' }}></i>
                            {t("Logout")}
                          </a></li>
                        </ul>
                      </li>
                    </> : (
                      <li className="account">
                        <Link to="/login"><i className="fa fa-sign-in" aria-hidden="true" style={{ marginRight: '2px' }}></i>
                          {t("Sign In")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <Link to="/">MO<span>NO</span></Link>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li><Link to="/">
                      {t("Home Page")}
                    </Link></li>
                    <li><Link to="/introduction">
                      {t("Introduction")}
                    </Link></li>
                    <li><Link to="/shop">
                      {t("Shop")}
                    </Link></li>
                    <li><Link to="/news">
                      {t("News")}
                    </Link></li>
                    <li><Link to="/contact-us">
                      {t("Contact")}
                    </Link></li>
                    <li><Link to="/check-order">
                      {t("Check order")}
                    </Link></li>
                  </ul>
                  <ul className="navbar_user" >
                    {/* <li><a href="#"><i className="fa fa-search" aria-hidden="true"></i></a></li> */}
                    {token ? <>
                      <li style={{ padding: '10px' }}>
                        <AccountPopover />
                      </li>
                    </> : <>
                    </>}
                    <li className="checkout">
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart" aria-hidden="true" style={{ fontSize: '32px'}} ></i>
                        {dataCart.length === 0 ? (<></>) : (
                          <span id="checkout_items" className="checkout_items">
                            {dataCart.length}
                          </span>
                        )}
                      </Link>
                    </li>
                  </ul>
                  <div className="hamburger_container">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="fs_menu_overlay"></div>
      <div className="hamburger_menu">
        <div className="hamburger_close"><i className="fa fa-times" aria-hidden="true"></i></div>
        <div className="hamburger_menu_content text-right">
          <ul className="menu_top_nav">
            <li className="menu_item has-children">
              <a href="#">
                <LanguagePopover />
                <i className="fa fa-angle-down"></i>
              </a>
            </li>
            <li className="menu_item has-children">
              <a href="#">
                {t("My Account")}
                <i className="fa fa-angle-down"></i>
              </a>
              <ul className="menu_selection">
                <li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i>
                  {t("Sign In")}
                </Link></li>
              </ul>
            </li>
            <li><Link to="/">
              {t("Home Page")}
            </Link></li>
            <li><Link to="/introduction">
              {t("Introduction")}
            </Link></li>
            <li><Link to="/shop">
              {t("Shop")}
            </Link></li>
            <li><Link to="/news">
              {t("News")}
            </Link></li>
            <li><Link to="/contact-us">
              {t("Contact")}
            </Link></li>
            <li><Link to="/check-order">
              {t("Check order")}
            </Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Header;