import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { apiUserUpdateCartById } from "src/services/Carts";

const CartAmountToggle = ({ id, amount, setDecrease, setIncrease, color, size }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => {
          setDecrease();
          apiUserUpdateCartById(id, amount - 1, size, color).then((res) => {
            console.log(res.data);
          }).catch(err => {
            console.log(err)
          })
        }
        }>
          <FaMinus style={{ fontSize: '12px' }} />
        </button>
        <div className="amount-style" style={{ fontSize: '16px', color: '#000' }}>{amount}</div>
        <button onClick={() => {
          setIncrease();
          apiUserUpdateCartById(id, amount + 1, size, color).then((res) => {
            console.log(res.data);
          }).catch(err => {
            console.log(err)
          })
        }
        }>
          <FaPlus style={{ fontSize: '12px' }} />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
