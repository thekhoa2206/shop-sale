import React from "react";
import { Link } from "react-router-dom";

const SellerNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/seller/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/seller/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/seller/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default SellerNav;
