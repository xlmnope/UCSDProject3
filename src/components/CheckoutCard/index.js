import React from "react";
import "./style.css";

function CheckoutCard(props) {
  console.log("checkoutCard props: ", props);
  return <div className="card">
    <div className="card-body buttoncontainer" onClick={props.checkout}>
      <button id="checkout">Checkout</button>
    </div>

    <ul className="list-group list-group-flush">
      {props.cart.length > 0 ? props.cart.map(cartitem => (
         <li className="list-group-item">{cartitem} </li>
      )) : <li className="list-group-item">Empty</li>}
    </ul>
   
  </div>

}

export default CheckoutCard;


