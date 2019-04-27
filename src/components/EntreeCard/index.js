import React from "react";
import "./style.css";



function EntreeCard(props) {
  return <div className="card entreecard">
  <img className="card-img-top" src={props.image} alt="food"/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">{props.description}</p>
  </div>
</div>


}

export default EntreeCard;
