import React from "react";
import "./style.css";
import "./filterbar.js"


function FilterBar(props) {
  return <div>
  <nav className="navbar navbar-expand-md navbar-light filterbar" id="navbar">
  <div className="container">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span className="navbar-toggler-icon"></span>
    </button>
    {/* <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="/">Most Popular</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Burgers</a>
            </li>
            <li className="nav-item ">
                <a className="nav-link" href="/">Sweet Treats</a>
            </li>
            <li className="nav-item ">
                <a className="nav-link" href="/">Sides</a>
            </li>
        </ul>
    </div> */}
    </div>
  </nav>
</div>
}

export default FilterBar;


