import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUserGetAllProductByCategoryId } from 'src/services/Product';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch, useSelector } from 'react-redux';
import useScript from 'src/constants/useScript';

const MainProduct = () => {
  const { t } = useTranslation("translation");
  const [dataProduct, setDataProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const dispatch = useDispatch();

  const id = 16;

  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');
  useScript('../assets/js/jquery-3.2.1.min.js');
  useScript('../assets/js/popper.js');
  useScript('../assets/js/bootstrap.min.js');
  useScript('../assets/js/isotope.pkgd.min.js');
  useScript('../assets/js/custom.js');
  useScript('../assets/js/easing.js');
  useScript('../assets/js/bootstrap.bundle.min.js');
  useScript('../assets/js/script.js?v=2.0');
  const dataCategoryId = useSelector(state => state.category.data);

  console.log(dataCategoryId.id)

  useEffect(() => {
    dispatch(openLoadingApi())
    if (dataCategoryId.id !== '') {
      let id = dataCategoryId.id;
      dispatch(openLoadingApi());
      apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, id).then(result => {
        setDataProduct(result.data.data.items);
        dispatch(closeLoadingApi());
      }).catch(err => {
        dispatch(closeLoadingApi());
      })
    } else {
      dispatch(openLoadingApi());
      apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, id).then(result => {
        setDataProduct(result.data.data.items);
        dispatch(closeLoadingApi());
      }).catch(err => {
        dispatch(closeLoadingApi());
      })
    }
  }, [dataCategoryId, keyword])

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <div className="MainDiv">
      <header className="border-bottom mb-4 pb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="d-block py-2">{dataProduct.length} Items found </strong>
        <div className="ms-auto ">
          <input onChange={handleChange} value={keyword} className="form-control d-inline-block " style={{ width: '175px', marginRight: '20px' }} placeholder="Search" />
          <div className="btn-group">
            <a href="#" className="btn btn-light active" data-bs-toggle="tooltip" title="Sort">
              <i className="fa fa-th"></i>
            </a>
          </div>
        </div>
      </header>
      <div className="new_arrivals">
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
                  <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                </div>
              )
            })}
          </div>
          <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.125)' }}>
            <footer class="d-flex mt-4">
              <nav class="ms-3">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active" aria-current="page">
                    <span class="page-link">2</span>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainProduct;