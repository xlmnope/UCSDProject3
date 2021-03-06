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
      {props.cart.length > 0 ? props.cart.map((cartitem, index) => (
         <li className="list-group-item itemrow">
            <div className="selectamountcontainer">
              <select className="selectamount" id={`${index}`} onChange={props.recalculateCart}>
              {props.renderOptions(cartitem.count)}
              </select>
            </div>
            <div className="itemandoptions">
              <div className="item">
              {cartitem.name}
              </div>
              <div className="optionscontainer">
                <div className="optionscart">
                  {/* {this.renderSelectedOptions} */}
                  {cartitem.options}  
                </div> 
              </div>
              <button class="remove" type="button" id={`${index}`} onClick={props.removeFromCart}>Remove</button>

              
            </div>
            <div className="pricecart">
              {cartitem.totalprice}  
            </div>
            
          </li>
      )) : <li className="list-group-item empty">Add items to your cart and they’ll appear herename.</li>}
    </ul>
   
  </div>

}

export default CheckoutCard;


