import React from "react";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { apiUserDeleteCartById } from "src/services/Carts";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/creates-action/CartActions";
import FormatPrice from "../../utils/FormatPrice";

const CartItem = ({ id, quantity, color, size, product }) => {
  const [amount, setAmount] = useState('');
  const [dataProductId, setDataProductId] = useState('');
  const [stock, setStock] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setAmount(quantity);
    setDataProductId(product);
    setStock(product.available);
  }, [])

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const setDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      setAmount(1);
    }
  };

  const setIncrease = () => {
    if (amount < stock) {
      setAmount(amount + 1);
    } else {
      setAmount(stock);
    }
  };

  return dataProductId && (
    <>
      <div className="cart_heading " style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', }}>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <div>
            <img src={dataProductId?.images[0]} alt={dataProductId.name} style={{ width: '75px', height: '75px', display: 'block', marginRight: '20px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography style={{ color: '#000', fontSize: '12px', width: '250px' }}>{dataProductId?.name}</Typography>
            <div style={{ display: 'flex', alignItems: 'center', }}>
              <div className="color-div" style={{ marginRight: '10px' }}>
                <Typography sx={{ marginRight: '4px', fontSize: '12px' }}>SIZE:</Typography>
                <Typography sx={{ fontSize: '12px' }}>{size}</Typography>
              </div>
              <div className="color-div">
                <Typography sx={{ marginRight: '4px', fontSize: '12px' }}>COLOR:</Typography>
                <div
                  className="color-style"
                  style={{ backgroundColor: color, color: color }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-hide" style={{ width: '80px' }}>
          <FormatPrice price={dataProductId?.priceSell} />
        </div>
        <div style={{ border: '1px solid #ddd', color: '#666', textShadow: '1px 1px 1px #fff', padding: '5px' }}>
          <CartAmountToggle
            amount={amount}
            id={id}
            color={color}
            size={size}
            setDecrease={setDecrease}
            setIncrease={setIncrease}
          />
        </div>
        <div className="cart-hide">
          <FormatPrice price={dataProductId.priceSell * amount} />
        </div>
        <div>
          <FaTrash className="remove_icon"
            style={{ fontSize: '14px' }}
            onClick={() => {
              apiUserDeleteCartById(id).then((res) => {
                toast.success(res.data.message, options);
                dispatch(addToCart());
              }).catch(err => {
                console.log(err);
              })
            }}
          />
        </div>
        <ToastContainer></ToastContainer>
      </div>
      <Divider></Divider>
    </>
  );
};

export default CartItem;
