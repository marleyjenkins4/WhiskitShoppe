import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthManagement";
import SignOut from "./SignOut";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  window.onload = function () {};

  const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src="../img/logo.png" />
      </Link>

      <nav id="main-menu">
        <ul>
          <li>
            <Link to="/gallery" className="first">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/menu" className="mid1">
              Menu
            </Link>
          </li>
          <li> </li>
          <li>
            <Link to="/cart" className="mid2">
              Cart
            </Link>
          </li>
          {!!currentUser ? (
            <li>
              <div className="last">
                <SignOut />
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login" className="last">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <input type="checkbox" id="hamburger-input" className="burger-shower" />
      <label id="hamburger-menu" htmlFor="hamburger-input">
        <div className="hamburger-menu"></div>
        <div className="hamburger-menu"></div>
        <div className="hamburger-menu"></div>

        <nav id="sidebar-menu">
        <i className="fa-solid fa-circle-xmark" id="x"></i>
          <ul>
            <li>
              <Link to="/login" className="first">
                <i className="fa-solid fa-user-large" id="profile"></i>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/gallery" className="last">
                <i className="fa-solid fa-image" id="icon"></i>Gallery
              </Link>
            </li>
            <li>
              <Link to="/menu" className="mid1">
                <i className="fa-solid fa-cake-candles" id="icon"></i>Menu
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/cart" className="mid2">
                <i className="fa-solid fa-cart-shopping" id="icon"></i>Cart
              </Link>
            </li>
          </ul>
        </nav>
      </label>

      <div className="overlay"></div>
    </div>
  );
};

export default Nav;
