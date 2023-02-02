import React from "react";
import { useState } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { apiUserGetAllCartItem } from "src/services/Carts";
import { useEffect } from "react";
import PaymentItem from "./PaymentItem";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { apiUserCreateOrder } from "src/services/Order";
import { useNavigate } from "react-router-dom";
import FormatPrice from "src/utils/FormatPrice";

const PaymentInforProduct = () => {
  const [dataCart, setDataCart] = useState([]);
  const dataAddToCart = useSelector(state => state.cart.data);
  const [total, setTotal] = useState(0);
  const [addressId, setAddressId] = useState(1);
  const [cartIds, setCartIds] = useState([]);
  const navigate = useNavigate();

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  useEffect(() => {
    apiUserGetAllCartItem().then((res) => {
      setDataCart(res.data.data);
      if (res.data.data?.length > 0) {
        let total = 0;
        let arr = []
        for (let i = 0; i < res.data.data.length; i++) {
          arr.push(res.data.data[i].id)
          total += res.data.data[i].product.priceSell * res.data.data[i].quantity;
        }
        setTotal(total);
        setCartIds(arr);
      } else {
      }
    }
    ).catch((err) => {
      console.log(err);
    })
  }, [dataAddToCart])

  const handleOrderClick = () => {
    apiUserCreateOrder(cartIds, addressId).then((res) => {
      toast.success(res.data.message, options);
      navigate('/order-received', { replace: true });
    }
    ).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div className="cart_heading">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
            <Typography style={{ color: '#000', fontSize: '14px' }}>
              SẢN PHẨM</Typography>
            <Typography style={{ color: '#000', fontSize: '14px' }}>
              TỔNG</Typography>
          </div>
          <div>
            {dataCart.map((curElem) => {
              return <PaymentItem key={curElem.id} {...curElem}
                total={total}
              />;
            })}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', padding: '15px 0' }}>
          <Typography style={{ color: '#000', fontSize: '14px', width: '250px' }}>
            Tổng
          </Typography>
          <FormatPrice price={total} />
        </div>
        <FormControl sx={{ py: 1 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="1"
            name="radio-buttons-group"
          >
            <FormControlLabel value="1" control={<Radio />} label="Trả tiền mặt khi nhận hàng" />
            <FormControlLabel value="2" control={<Radio />} label="Chuyển khoản ngân hàng" />
          </RadioGroup>
        </FormControl>
        <Divider></Divider>
        <Button
          fullWidth
          size="large"
          onClick={handleOrderClick}
          type="submit"
          variant="contained"
          className="black_button_auth">ĐẶT HÀNG</Button>
        <div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default PaymentInforProduct;
