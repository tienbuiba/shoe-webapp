import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUserGetAllProductByCategoryId } from 'src/services/Product';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch, useSelector } from 'react-redux';
import useScript from 'src/hooks/useScript';
import { TablePagination } from '@mui/material';

const MainProduct = () => {
  const { t } = useTranslation("translation");
  const [dataProduct, setDataProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const id = 16;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(openLoadingApi())
    if (dataCategoryId.id !== '') {
      let id = dataCategoryId.id;
      dispatch(openLoadingApi());
      apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, id).then(result => {
        setDataProduct(result.data.data.items);
        setTotal(result?.data?.data?.total);
        dispatch(closeLoadingApi());
      }).catch(err => {
        dispatch(closeLoadingApi());
      })
    } else {
      dispatch(openLoadingApi());
      apiUserGetAllProductByCategoryId(rowsPerPage, page, keyword, id).then(result => {
        setDataProduct(result.data.data.items);
        dispatch(closeLoadingApi());
        setTotal(result?.data?.data?.total);
      }).catch(err => {
        dispatch(closeLoadingApi());
      })
    }
  }, [dataCategoryId, keyword, rowsPerPage, page])

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <div className="MainDiv">
      <header className="border-bottom mb-4 pb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong className="d-block py-2">{total} Items found </strong>
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
                  <div className="red_button add_to_cart_button"><Link to={`/product-detail/${row.id}`}>add to cart</Link></div>
                </div>
              )
            })}
          </div>

          {dataProduct?.length > 0 && total !== 0 && total > 12 ? (

            <>
              <div style={{ borderTop: '1px solid rgba(0,0,0,.125)' }}>
                <TablePagination
                  rowsPerPageOptions={[8, 12, 16]}
                  component="div"
                  sx={{
                    height: '70px',
                    '.MuiTablePagination-toolbar': {
                      color: 'rgb(41, 39, 39)',
                      height: '35px',
                    },
                    '.MuiBox-root': {
                      backgroundColor: 'yellow',
                      color: 'black',
                      '& .MuiSvgIcon-root': {
                        backgroundColor: 'purple',
                        color: 'black',
                        fontSize: '20px'
                      },
                    },
                  }}
                  style={{ color: "#b5b8c4", fontSize: "14px" }}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

              </div>
            </>
          ) : (
            <>
              <p style={{ textAlign: "center", marginTop: '20px' }}>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default MainProduct;