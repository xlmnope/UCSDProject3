import React from "react";
import "./style.css";
function NavBar(props) {
  return <div className="">
  
  <nav className="navbar navbar-expand-md sticky navbar-light ">
  <div className="container">
    <a className="navbar-brand abs" href="/">Busy Bite</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="/">About</a>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/" data-target="#myModal" data-toggle="modal">    
                  <i className="fas fa-shopping-cart"></i>
                </a>
            </li>
        </ul>
    </div>
    </div>
  </nav>
</div>
}

export default NavBar;


