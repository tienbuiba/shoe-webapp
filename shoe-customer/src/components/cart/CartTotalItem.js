import React from "react";
import { Button, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiUserGetDeliveryAddress } from "../../services/Address";
import FormatPrice from "../../utils/FormatPrice";
import { useTranslation } from "react-i18next";

const CartTotalItem = ({ id, quantity, total }) => {
  const [dataListAddress, setDataListAddress] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);
  const { t } = useTranslation("translation");


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
            {t("Subtotal")}
          </Typography>
          <FormatPrice price={total} />
        </div>
        {hasAddress === true ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
            <Typography style={{ color: '#000', fontSize: '14px', width: '150px' }}>
              {t("Delivery")}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <Typography style={{ color: '#000', fontSize: '12px', padding: '8px 0px ' }} >
                {t("Free delivery")}
              </Typography>
              <Typography style={{ color: '#000', fontSize: '12px', textAlign: 'center' }}>
                {t("Transport to")}
                <span style={{ color: '#', marginLeft: '4px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                  {dataListAddress[0]?.detail}, {dataListAddress[0].city.name}
                </span>
              </Typography>
              <Link to="/update-delivery-address" className="address-change-heading" style={{ color: '#000', fontSize: '12px', padding: '8px 0px' }} >
                {t("Change address")}
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
            <Typography style={{ color: '#000', fontSize: '14px', width: '150px' }}>
              {t("Delivery")}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <Typography style={{ color: '#000', fontSize: '12px', padding: '8px 0px ' }} >
                {t("Free delivery")}
              </Typography>
              <Typography style={{ color: '#000', fontSize: '12px' }}>
                {t("Shipping options will be updated during checkout.")}
              </Typography>
              <Typography style={{ color: '#000', fontSize: '12px' }}>
                {t("Delivery charge")}
              </Typography>
            </div>
          </div>)
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e8e0', marginBottom: '20px', paddingBottom: '4px' }}>
        <Typography style={{ color: '#000', fontSize: '14px', width: '250px' }}>
          {t("Total")}
        </Typography>
        <FormatPrice price={total} />
      </div>
      <Button
        fullWidth
        size="large"
        component={NavLink}
        to="/payment-infor"
        variant="contained"
        className="black_button_auth">
        {t("Proceed to Payment")}
      </Button>
      <div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default CartTotalItem;
