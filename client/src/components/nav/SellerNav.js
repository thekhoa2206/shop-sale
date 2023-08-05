import React from "react";
import { Link } from "react-router-dom";

const SellerNav = () => (
  <nav style={{backgroundColor: "#182537", height: "100%"}}>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/seller/dashboard" className="nav-link"  style={{color: "#FFFFFF"}}>
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/seller/product" className="nav-link"  style={{color: "#FFFFFF"}}>
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/seller/products" className="nav-link"  style={{color: "#FFFFFF"}}>
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link"  style={{color: "#FFFFFF"}}>
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default SellerNav;
