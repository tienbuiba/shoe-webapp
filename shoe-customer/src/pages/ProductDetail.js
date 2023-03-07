import styled from "styled-components";
import Footer from "src/layouts/Footer";
import { Avatar, Breadcrumbs, Container, Divider, Grid, Link } from "@mui/material";
import Header from "src/layouts/Header";
import Page from "src/components/Page";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUseCreateProductCommentById, apiUserGetProductById, apiUserGetProductCommentById } from "src/services/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "src/redux/creates-action/CartActions";
import { apiUserCreateCart } from "src/services/Carts";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { apiUserGetCategoryById } from "src/services/Categories";
import { ToastContainer, toast } from 'react-toastify';
import FormatPrice from "../utils/FormatPrice";
import CartAmountToggle from "../components/cart/CartAmountToggle";
import Star from "src/components/cart/Star";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fDateLocal } from "src/utils/formatTime";
import TokenService from "src/services/TokenService";
import { closeLoadingApi, openLoadingApi } from "src/redux/creates-action/LoadingAction";
import { useTranslation } from "react-i18next";
import Newsletter from "src/components/Newsletter";

const Button = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: #fe4c50;
  color: rgb(255 255 255);
  padding: 1.4rem 2.4rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    transform: scale(0.96);
  }
  a {
    text-decoration: none;
    color: rgb(255 255 255);
    font-size: 1.8rem;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation("translation");

  const edit = true;
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [content, setContent] = useState('')

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  useEffect(() => {
    apiUserGetProductById(id).then((res) => {
      setData(res?.data?.data);
      setMainImage(res?.data?.data?.images[0]);
      apiUserGetCategoryById(res?.data?.data?.categoryId).then((res) => {
        setDataCategory(res?.data.data.name);
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState("");

  const [dataComment, setDataComment] = useState('')

  const [mainImage, setMainImage] = useState('');
  const setDecrease = () => {
    amount > 0 ? setAmount(amount - 1) : setAmount(0);
  };
  const setIncrease = () => {
    amount < 100 ? setAmount(amount + 1) : setAmount(100);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (id !== '' && size !== '' && color !== '') {
      apiUserCreateCart(parseInt(id), amount, (size).toString(), color).then((res) => {
        toast.success(res.data.message, options);
        dispatch(addToCart());
        setSize('');
        setColor('');
        setAmount(1);
        navigate("/cart");
      }).catch((err) => {
        toast.error(err.response.data.message[0], options);
      })
    } else {
      alert('Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn.')
    }
  }


  useEffect(() => {
    dispatch(openLoadingApi());
    apiUserGetProductCommentById(id).then((res) => {
      setDataComment(res?.data?.data)
    }).catch((err) => {
      console.log(err);
    })
      .finally(() => {
        dispatch(closeLoadingApi());
      })
  }, [])

  return data && (
    <Page title={t("Product details")}>
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3> {dataCategory} </h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    {t("HOME PAGE")}
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/shop"
                  >
                    {t("Shop")}
                  </Link>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '75px', marginBottom: '200px' }}>
        <Wrapper>
          <Container className="container">
            <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '10px' }}>
              <div className="product_images">
                <div>
                  <div className="main-screen">
                    <img
                      src={mainImage}
                      alt="product"
                      className="main-image-preview"
                      style={{
                        boxShadow: '0 6px 16px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '4px'
                      }} />
                  </div>
                  <div>
                    <Slider {...settings} style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
                      {data?.images?.map((curElm, index) => {
                        return (
                          <figure>
                            <img
                              src={curElm}
                              alt={"curElm.filename"}
                              className="img-box-style"
                              key={index}
                              onClick={() => setMainImage(curElm)}
                            />
                          </figure>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="product-data">
                <h3>{data.name}</h3>
                <Star stars={data.ratingAvg} reviews={data.reviewCount} />
                <p style={{ color: '#000', marginBottom: '4px' }}>
                  {t("Price Origin")}                  :
                  <del style={{ color: '#ccc' }}>
                    <FormatPrice price={data.priceOrigin} />
                  </del>
                </p>
                <p style={{ color: '#000', marginBottom: '4px' }}>
                  {t("Deal of the Day")}
                  : <FormatPrice price={data.priceSell} />
                </p>
                <div className="product-data-info">
                  <p style={{ marginBottom: '4px' }}>
                    <p style={{ width: '150px', color: '#222', display: 'inline-block', marginBottom: '4px' }}>
                      {t("Available")}
                      :</p>
                    <span style={{ width: '150px', display: 'inline-block' }}> {data.status === "AVAILABLE" ?
                      `${data.available} ${t("In Stock")}`
                      :
                      t("Not Available")
                    }
                    </span>
                  </p>
                  <p style={{ marginBottom: '4px' }}>
                    <p style={{ width: '150px', textAlign: 'left', color: '#222', display: 'inline-block', marginBottom: '4px' }}>
                      {t("Brand")}
                      :</p>
                    <span style={{ width: '150px', display: 'inline-block' }}> {data.brand} </span>
                  </p>
                </div>
                <Wrapper>
                  <div className="colors">
                    <p style={{ color: '#000', marginBottom: '4px' }}>
                      {t("Size")}
                      :
                      {data?.size?.map((curSize, index) => {
                        return (
                          <btnSizeStyle
                            key={index}
                            className={size === curSize ? "btnSizeStyle active" : "btnSizeStyle"}
                            onClick={() => setSize(curSize)}>
                            <p style={{ textAlign: "center" }}>
                              {size === curSize ? <span className="tickStyle">{curSize}</span> :
                                <span className="okSize">{curSize}</span>
                              }
                            </p>
                          </btnSizeStyle>
                        );
                      })}
                    </p>
                  </div>
                </Wrapper>
                <Wrapper>
                  <div className="colors">
                    <p style={{ color: '#000', marginBottom: '4px' }}>
                      {t("Color")}:
                      {data?.color?.map((curColor, index) => {
                        return (
                          <btnStyle
                            key={index}
                            style={{ backgroundColor: curColor }}
                            className={color === curColor ? "btnStyle active" : "btnStyle"}
                            onClick={() => setColor(curColor)}>
                            {color === curColor ? <FaCheck className="checkStyle" /> : null}
                          </btnStyle>
                        );
                      })}
                    </p>
                  </div>
                </Wrapper>
                <hr />
                {data?.available > 0 && (
                  <div>
                    <CartAmountToggle
                      amount={amount}
                      setDecrease={setDecrease}
                      setIncrease={setIncrease}
                    />
                    <Button className="btn" component={Link} to={"/cart"} size="small" onClick={handleClick}>
                      {t("add to cart")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="MainDiv mb-5" >
              <div className="benefit">
                <div className="container">
                  <div className="row benefit_row" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
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
              <Divider />
            </div>
            <div className="row">
              <h3>
                {t("DESCRIPTION")}
                <Divider sx={{ my: 3, border: '1px solid #000' }} />
              </h3>
              <div dangerouslySetInnerHTML={{ __html: data.longDesc }} />
            </div>
          </Container>
        </Wrapper>
      </div>
      <Newsletter/>   
      <ToastContainer />
      <Footer />
    </Page>
  );
};

const Wrapper = styled.section`
  .product_images {
    width: 47%; 
  }
  .product-data {
    display: flex;
    width: 47%;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;   
    .product-data-price {
      font-weight: bold;
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;
      span {
        font-weight: bold;
      }
    }
    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }
  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }  
    .colors p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: red;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 20%);
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    height: 2rem;
    width:2rem;
    text-align: center;
    color: #fff;
    line-height: 2rem;
  }
  .tickStyle {
    font-size: 1rem;
    height: 2rem;
    width: 2rem;
    background-color: red;
    text-align: center;
    color: #fff;
    line-height: 2rem;
    opacity: 1;
  }

  .okSize {
    font-size: 1rem;
    height: 2rem;
    text-align: center;
    color: #555;
    line-height: 2rem;
  }  
  .amount-toggle {
    ${'' /* margin-top: 1rem; */}
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 1.4rem;
      color: #000;
    }
  }
  .img-box-style {
      max-width: 75px;
      height: auto;
      padding: 2px;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
    }
    .main-image-preview {
      width: 100%;
      height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
    }
    .btnSizeStyle {
    width: 2rem;
    height: 2rem;
    background-color: #999;
    border: 1px solid #ccc;
    border-radius: 10%;
    color: #ccc;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }

  .product-data-real-price {
    color: #222;
  }
`;

export default ProductDetail;




