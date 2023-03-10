import React from 'react';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';
import { apiUserGetAllTopProductSell } from 'src/services/Product';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Top12Sell = (props) => {
  const { t } = useTranslation("translation");
  const [dataProduct, setDataProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const smUp = useResponsive('up', 'sm');
  const { view } = props;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetAllTopProductSell().then(result => {
      setDataProduct(result.data.data);
      dispatch(closeLoadingApi());
    }).catch(err => {
      dispatch(closeLoadingApi());
    })
  }, []);

  return (
    <div className="MainDiv">
      <header className="border-bottom mb-4 pb-3">
      </header>
      <div className="new_arrivals" style={{ paddingBottom: '45px', paddingTop: '20px' }}>
        <div className="container">
          {!smUp ? <Slider {...settings2} style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20px' }}>
            {dataProduct?.map((row) => {
              return (
                <div className="product-item" key={row.id}>
                  <Link to={`/product-detail/${row.id}`}>
                    <div className="product discount product_filter">
                      <div className="product_image">
                        <img src={row.images[0]} alt="image" />
                      </div>
                      <div className="favorite favorite_left"></div>
                      {row.id % 2 === 1 ?
                        <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>
                        :
                        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                      }
                      <div className="product_info">
                        <h6 className="product_name">{row.name}</h6>
                        {row.id % 2 === 1 ?
                          <div className="product_price">{row.priceSell} đ</div>
                          :
                          <div className="product_price">{row.priceSell} đ<span>${row.priceOrigin} đ</span></div>
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ fontSize: '8px' }}></i>
                          </p>
                          <p style={{ fontSize: '10px', color: 'rgba(0,0,0,.54)' }}>{row.sold}
                            <span style={{ marginLeft: '4px' }}>
                              {t("solds")}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="red_button add_to_cart_button"><Link to={`product-detail/:${row.id}`}>
                    {t("add to cart")}
                  </Link></div>
                </div>
              )
            })}
          </Slider> :
            <Slider {...settings} style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20px' }}>
              {dataProduct?.map((row) => {
                return (
                  <div className="product-item" key={row.id}>
                    <Link to={`/product-detail/${row.id}`}>
                      <div className="product discount product_filter">
                        <div className="product_image">
                          <img src={row.images[0]} alt="image" />
                        </div>
                        <div className="favorite favorite_left"></div>
                        {row.id % 2 === 1 ?
                          <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>
                          :
                          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                        }
                        <div className="product_info">
                          <h6 className="product_name">{row.name}</h6>
                          {row.id % 2 === 1 ?
                            <div className="product_price">{row.priceSell} đ</div>
                            :
                            <div className="product_price">{row.priceSell} đ<span>${row.priceOrigin} đ</span></div>
                          }
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p>
                              <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                              <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                              <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                              <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                              <i class="fa fa-star" style={{ fontSize: '8px' }}></i>
                            </p>
                            <p style={{ fontSize: '10px', color: 'rgba(0,0,0,.54)' }}>{row.sold}
                              <span style={{ marginLeft: '4px' }}>
                                {t("solds")}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="red_button add_to_cart_button"><Link to={`product-detail/:${row.id}`}>
                      {t("add to cart")}
                    </Link></div>
                  </div>
                )
              })}
            </Slider>}
        </div>
      </div>
      {view === "none" ? <></> :
        <div style={{ marginBottom: '150px' }}>
          <Link to="/shop" style={{
            backgroundColor: '#fe4c50',
            width: '150px',
            height: '45px',
            color: 'white',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateX(-50%)',
            left: '50%',
            border: ' 1px solid #rgba(0,0,0,0.05)',
            display: `${dataProduct.length > 0 ? 'flex' : 'none'}`
          }}>
            {t("View All")}
            <i className="fa fa-chevron-right" style={{ marginLeft: '10px' }}></i>
          </Link>
        </div>
      }
    </div>
  )
}
export default Top12Sell;