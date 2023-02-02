import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import FormatPrice from "src/utils/FormatPrice";
import { apiUserGetProductById } from "src/services/Product";

const PaymentItem = ({ id, quantity, color, size, productId }) => {
  const [amount, setAmount] = useState('');
  const [dataProductId, setDataProductId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setAmount(quantity);
    apiUserGetProductById(productId).then(res => {
      setDataProductId(res?.data?.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return dataProductId && (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', lineHeight: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <img src={dataProductId?.images[0]} alt={dataProductId.name} style={{ width: '25px', height: '25px', display: 'block', marginRight: '10px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'stretch', }}>
              <Typography style={{ color: '#000', fontSize: '12px', width: '200px' }}>{dataProductId?.name}</Typography>
              <Typography style={{ color: '#000', fontSize: '12px' }}>x {amount}</Typography>
            </div>
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
        <div>
          <FormatPrice price={dataProductId.priceSell * amount} />
        </div>
      </div>
      <Divider sx={{ border: '0.2px dotted #ccc' }} ></Divider>
    </>
  );
};

export default PaymentItem;
