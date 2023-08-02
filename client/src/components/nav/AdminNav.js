import React from "react";
import { Link } from "react-router-dom";
import WindowIcon from '@mui/icons-material/Window';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockIcon from '@mui/icons-material/Lock';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
const AdminNav = () => (
  <nav style={{backgroundColor: "#182537", height: "100%"}}>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link" style={{color: "#FFFFFF"}}>
          <WindowIcon style={{width: 16, marginTop: -3}}/> Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link" style={{color: "#FFFFFF"}}>
        <InventoryIcon style={{width: 16, marginTop: -3}}/>  Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link" style={{color: "#FFFFFF"}}>
        <InventoryIcon style={{width: 16, marginTop: -3}}/>   Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link" style={{color: "#FFFFFF"}}>
        <CategoryIcon style={{width: 16, marginTop: -3}}/>  Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link" style={{color: "#FFFFFF"}}>
        <CategoryIcon style={{width: 16, marginTop: -3}}/>  Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link" style={{color: "#FFFFFF"}}>
        <DiscountIcon style={{width: 16, marginTop: -3}}/>  Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link" style={{color: "#FFFFFF"}}>
        <LockIcon style={{width: 16, marginTop: -3}}/>  Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/user/info" className="nav-link" style={{color: "#FFFFFF"}}>
        <ManageAccountsIcon style={{width: 16, marginTop: -3}}/>  User
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
