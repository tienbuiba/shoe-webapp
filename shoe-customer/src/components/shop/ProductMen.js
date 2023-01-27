import React from 'react';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import useScript from 'src/constants/useScript';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUserGetAllProductByCategoryId } from 'src/services/Product';
import { Link } from 'react-router-dom';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';

const ProductMen = () => {
  const { t } = useTranslation("translation");
  const [dataProduct, setDataProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();

  const smUp = useResponsive('up', 'sm');
  // useScript('../assets/js/jquery-3.2.1.min.js');
  // useScript('../assets/js/popper.js');
  // useScript('../assets/js/bootstrap.min.js');
  // useScript('../assets/js/isotope.pkgd.min.js');
  // useScript('../assets/js/custom.js');
  // useScript('../assets/js/easing.js');
  // useScript('../assets/js/bootstrap.bundle.min.js');
  // useScript('../assets/js/script.js?v=2.0');

  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, 16).then(result => {
      setDataProduct(result.data.data.items);
      dispatch(closeLoadingApi());
    }).catch(err => {
      dispatch(closeLoadingApi());
    })
  }, []);

  return (
    <div className="MainDiv">
      <header className="border-bottom mb-4 pb-3">
      </header>
      <div className="new_arrivals" style={{ paddingBottom: '75px' }}>
        <div className="container">
          <div className="row">
            {dataProduct?.map((row) => {
              return (
                <div className="product-item accessories" key={row.id}>
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
                  </Link>
                  <div className="red_button add_to_cart_button"><Link to="/cart">add to cart</Link></div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          style={{ marginTop: '50px' }}
        >
          <Link to="/shop" style={{
            backgroundColor: '#fe4c50',
            width: '150px',
            height: '45px',
            color: 'white',
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateX(-50%)',
            left: '50%',
            border: ' 1px solid #rgba(0,0,0,0.05)',
          }}>
            View All <i className="fa fa-chevron-right" style={{ marginLeft: '10px' }}></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ProductMen;