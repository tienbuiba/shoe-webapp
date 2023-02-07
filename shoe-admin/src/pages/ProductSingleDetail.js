import styled from "styled-components";
import { Button, Card, Container, Divider, } from "@mui/material";
import Page from "src/components/Page";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { apiAdminGetProductById } from "src/services/Products";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import Star from "src/components/product/Star";
import { fNumber } from "src/utils/formatNumber";

const ProductSingleDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  useEffect(() => {
    apiAdminGetProductById(id).then((res) => {
      setData(res?.data?.data);
      setMainImage(res?.data?.data?.images[0]);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const [color, setColor] = useState('');
  const [size, setSize] = useState("");
  const [mainImage, setMainImage] = useState('');

  return data && (
    <Page title="Chi tiết sản phẩm">
      <Container maxWidth="lg">
        <Card sx={{ py: 4, px: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Button component={Link} to="/dashboard/products" startIcon={<ArrowBackIosIcon />} variant="contained">
              Quay lại
            </Button>
            <Button component={Link} to={`/dashboard/edit-product/${id}`} startIcon={<EditIcon />} variant="outlined">
              Sửa
            </Button>
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
                      Giá xuất xứ:
                      <del style={{ color: '#ccc' }}>
                        {fNumber(data.priceOrigin)}
                      </del>
                    </p>
                    <p style={{ color: '#000', marginBottom: '4px' }}>
                      Giá bán chính thức:

                      {fNumber(data.priceSell)}
                    </p>
                    <div className="product-data-info">
                      <p style={{ marginBottom: '4px' }}>
                        <p style={{ width: '150px', color: '#222', display: 'inline-block', marginBottom: '4px', fontSize: '14px' }}>Có Sẵn:</p>
                        <span style={{ width: '150px', display: 'inline-block', fontSize: '14px' }}> {data.status === "AVAILABLE" ? `${data.available} trong kho` : "Không có sẵn"}</span>
                      </p>
                      <p style={{ marginBottom: '4px' }}>
                        <p style={{ width: '150px', textAlign: 'left', color: '#222', display: 'inline-block', marginBottom: '4px', fontSize: '14px' }}>Hãng :</p>
                        <span style={{ width: '150px', display: 'inline-block', fontSize: '14px' }}> {data.brand} </span>
                      </p>
                      <p style={{ marginBottom: '4px' }}>
                        <p style={{ width: '150px', textAlign: 'left', color: '#222', display: 'inline-block', marginBottom: '4px', fontSize: '14px' }}>Đã bán :</p>
                        <span style={{ width: '150px', display: 'inline-block', fontSize: '14px' }}> {data.sold} </span>
                      </p>
                    </div>
                    <Wrapper>
                      <div className="colors">
                        <p style={{ color: '#000', marginBottom: '4px' }}>
                          Size:
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
                          Màu sắc:
                          {data?.color?.map((curColor, index) => {
                            return (
                              <btnStyle
                                key={index}
                                style={{ backgroundColor: curColor }}
                                className={color === curColor ? "btnStyle active" : "btnStyle"}
                                onClick={() => setColor(curColor)}>
                              </btnStyle>
                            );
                          })}
                        </p>
                      </div>
                    </Wrapper>
                    <hr />
                  </div>
                </div>
                <div style={{ marginTop: '100px' }}>
                  <h3>MÔ TẢ CHI TIẾT</h3>
                  <Divider sx={{ mt: 5, border: '1px solid #000' }} />
                  <div dangerouslySetInnerHTML={{ __html: data.longDesc }} />
                </div>
              </Container>
            </Wrapper>
          </div>
          <Divider></Divider>
        </Card>
      </Container>
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

export default ProductSingleDetail;




