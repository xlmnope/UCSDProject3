import React from "react";
import "./style.css";



function EntreeCard(props) {
  return <div className="card entreecard">
  <img className="card-img-top" src={props.image} alt="food"/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>


}

export default EntreeCard;
