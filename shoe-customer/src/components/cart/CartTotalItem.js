import React from "react";
import { Button, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiUserGetDeliveryAddress } from "../../services/Address";
import FormatPrice from "../../utils/FormatPrice";

const CartTotalItem = ({ id, quantity, total }) => {
  const [dataListAddress, setDataListAddress] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    apiUserGetDeliveryAddress().then((res) => {
      setDataListAddress(res.data.data);
      if (res.data.data.length > 0) {
        setHasAddress(true);
      } else {
        setHasAddress(false);
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return dataListAddress && (
    <div className="cart_heading ">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
          <Typography style={{ color: '#000', fontSize: '14px', width: '250px' }}>
            Tổng phụ</Typography>
          <FormatPrice price={total} />
        </div>
        {hasAddress === true ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
            <Typography style={{ color: '#000', fontSize: '14px', width: '150px' }}>
              Giao Hàng</Typography>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <Typography style={{ color: '#000', fontSize: '12px', padding: '8px 0px ' }} >
                Giao hàng miễn phí</Typography>
              <Typography style={{ color: '#000', fontSize: '12px', textAlign: 'center' }}>
                Vận chuyển đến
                <span style={{ color: '#', marginLeft: '4px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                  {dataListAddress[0]?.detail}, {dataListAddress[0].city.name}
                </span>
              </Typography>
              <Link to="/update-delivery-address" className="address-change-heading" style={{ color: '#000', fontSize: '12px', padding: '8px 0px' }} >
                Đổi địa chỉ</Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
            <Typography style={{ color: '#000', fontSize: '14px', width: '150px' }}>
              Giao Hàng</Typography>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <Typography style={{ color: '#000', fontSize: '12px', padding: '8px 0px ' }} >
                Giao hàng miễn phí</Typography>
              <Typography style={{ color: '#000', fontSize: '12px' }}>
                Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.</Typography>
              <Typography style={{ color: '#000', fontSize: '12px' }}>
                Tính phí giao hàng</Typography>
            </div>
          </div>)
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
        <Typography style={{ color: '#000', fontSize: '14px', width: '250px' }}>
          Tổng</Typography>
        <FormatPrice price={total} />
      </div>
      <Button
        fullWidth
        size="large"
        component={NavLink}
        to="/payment-infor"
        type="submit"
        variant="contained"
        className="black_button_auth">Tiến Hành Thanh Toán</Button>
      <div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default CartTotalItem;
