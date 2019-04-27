import React from "react";

function CheckoutCard(props) {
  return <div class="card">
  <div class="card-body">
    <button id="checkout">Checkout</button>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="/" class="card-link">Card link</a>
    <a href="/" class="card-link">Another link</a>
  </div>
</div>

}

export default CheckoutCard;


