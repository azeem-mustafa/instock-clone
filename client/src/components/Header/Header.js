import React from "react";
import { NavLink } from "react-router-dom";
import { default as Logo1 } from "../../assets/logo/InStock-Logo_1x.png";
import { default as Logo2 } from "../../assets/logo/InStock-Logo_2x.png";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="nav">
          <div className="nav__flex-box">
            <NavLink to="/" exact className="nav__title">
              <div className="nav__logo">
                <img src={Logo1} alt="Logo" />
              </div>
            </NavLink>

            <div className="nav__items">
              <div className="nav__active">
                <NavLink to="/">Warehouse</NavLink>
              </div>
              <div className="nav__links">
                <NavLink to="/inventory">Inventory</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
