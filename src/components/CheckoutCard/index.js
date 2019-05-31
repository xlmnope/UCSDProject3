import React from "react";
import "./style.css";


function CheckoutCard(props) {

  
  console.log("checkoutCard props: ", props);
  return <div className="card">
    <div className="card-body buttoncontainer" onClick={props.checkout}>
      {props.cart.length === 0 ? 
      <button id="checkout" type="button" disabled>Checkout</button> 
      : <button id="checkout">Checkout</button>
    }</div>

    <ul className="list-group list-group-flush">
      {props.cart.length > 0 ? props.cart.map(cartitem => (
         <li className="list-group-item">
            <select>
              {props.renderOptions(cartitem.count)}
            </select>
             {cartitem.name} {cartitem.price}  
          </li>
      )) : <li className="list-group-item empty">Add items to your cart and they’ll appear herename.</li>}
    </ul>
   
  </div>

}

export default CheckoutCard;


