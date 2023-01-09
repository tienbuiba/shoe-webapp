import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import useScript from 'src/constants/useScript';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUserGetAllProductByCategoryId } from 'src/services/Product';

const MainProduct = () => {
  const { t } = useTranslation("translation");
  const [dataProduct, setDataProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');
  useScript('../assets/js/jquery-3.2.1.min.js');
  useScript('../assets/js/popper.js');
  useScript('../assets/js/bootstrap.min.js');
  useScript('../assets/js/isotope.pkgd.min.js');
  useScript('../assets/js/custom.js');
  useScript('../assets/js/easing.js');

  useEffect(() => {
    apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, 19).then(result => {
      setDataProduct(result.data.data.items)
    })
  }, [])

  return (
    <div className="MainDiv">
      <div className="new_arrivals">
        <div className="container">
          <div className="row" style={{ marginTop: '70px' }}>
            {dataProduct?.map((row) => {
              return (
                <div className="product-item accessories" key={row.id}>
                  <Link to={`/product-detail/${row.id}`}>
                    <div className="product discount product_filter">
                      <div className="product_image">
                        <img src={row.images[0]} alt="image" />
                      </div>
                      <div className="favorite favorite_left"></div>
                      {/* <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>sale</span></div> */}
                      {row.id % 2 === 1 ?
                        <div className="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>
                        :
                        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                      }
                      <div className="product_info">
                        <h6 className="product_name">{row.name}</h6>
                        {row.id % 2 === 1 ?
                          <div className="product_price">${row.priceSell}</div>
                          :
                          <div className="product_price">${row.priceSell}<span>${row.priceOrigin}</span></div>
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ color: '#ffa200', fontSize: '8px' }}></i>
                            <i class="fa fa-star" style={{ fontSize: '8px' }}></i>
                          </p>
                          <p style={{ fontSize: '10px', color: 'rgba(0,0,0,.54)' }}>{row.sold} solds</p>
                        </div>
                      </div>
                    </div>
                    <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainProduct;