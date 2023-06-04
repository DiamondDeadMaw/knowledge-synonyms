import { useState } from "react";
import {Link} from "react-router-dom"
import "./first.css";

import banner from "./assets/Banner.jpg"
import logo from "./assets/Logo-wh.png"
import circlesOverlay from "./assets/Banner-Circle.png"
import circlesOverlayBottom from "./assets/Banner-Bot.png"



const Navbar = () => {
  return (
    <div className="navbar">
        <div className="left">
        <img src={logo} alt="Logo" className="navbar__logo" />
        </div>
        <div className="right">
        <ul className="navbar__right">
        <li>
          <Link to="other" className="navbar-button">Buy Now</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >Free Trial</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >Use Cases</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >Blogs</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >Login</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >How It Works</Link>
        </li>
        <li>
          <Link to="other" className="navbar-button" >Contact us</Link>
        </li>
      </ul>
        </div>
    </div>
  );
};

function ImageOverlay() {
    return (
        <div className="image-overlay">
            <div className="overlay-bubbles" id="bubbles"></div>
            <div className="overlay-bubbles" id="bubbles-bottom"></div>
        </div>
    );
}

function First() {
    return (
        <div className ="container">
        <Navbar />
        <ImageOverlay />
    </div>
    );
}

export default First;