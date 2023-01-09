import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import { Divider } from '@mui/material';
import useScript from 'src/constants/useScript';
import LanguagePopover from './LanguagePopover';
import AccountPopover from './AccountMenu';
import TokenService from 'src/services/TokenService';

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
                <div className="top_nav_left">HOME: 319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM</div>
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
                          My Account
                          <i className="fa fa-angle-down"></i>
                        </a>
                        <ul className="account_selection">
                          <li><a onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</a></li>
                        </ul>
                      </li>
                    </> : (
                      <li className="account">
                        <Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</Link>
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
                    <li><Link to="/">Home Page</Link></li>
                    <li><Link to="/introduction">Introduction</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/contact-us">Contact</Link></li>
                    <li><Link to="/check-order">Check order</Link></li>
                  </ul>
                  <ul className="navbar_user" >
                    <li><a href="#"><i className="fa fa-search" aria-hidden="true"></i></a></li>
                    {token ? <>
                      <li style={{padding: '10px'}}>
                        <AccountPopover />
                      </li>
                    </> : <>
                    </>}
                    <li className="checkout">
                      <Link to="/orders">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span id="checkout_items" className="checkout_items">2</span>
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
                My Account
                <i className="fa fa-angle-down"></i>
              </a>
              <ul className="menu_selection">
                <li><Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</Link></li>
                <li><Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</Link></li>
              </ul>
            </li>
            <li><Link to="/">Home Page</Link></li>
            <Divider />
            <li><Link to="/introduction">Introduction</Link></li>
            <Divider />
            <li><Link to="/shop">Shop</Link></li>
            <Divider />
            <li><Link to="/news">News</Link></li>
            <Divider />
            <li><Link to="/check-order">Check order</Link></li>
            <Divider />
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Header;