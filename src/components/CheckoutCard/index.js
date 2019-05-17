import React from "react";
import "./style.css";

function CheckoutCard(props) {
  return <div className="card">
  <div className="card-body buttoncontainer">
    <button id="checkout">Checkout</button>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
  </ul>
  <div className="card-body">
    <a href="/" className="card-link">Card link</a>
    <a href="/" className="card-link">Another link</a>
  </div>
</div>

}

export default CheckoutCard;


