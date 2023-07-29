import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import { MenuItem, Select } from "@material-ui/core";
import { Badge, Menu } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectDatabase } from "../../functions/db";
import Search from "../forms/Search";
import CartIcon from "../svg/CartIcon";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [valueDatabase, setValueDatabase] = useState("no-value");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));


  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  document.addEventListener('DOMContentLoaded', () => {
    const databaseDropdown = document.getElementById('databaseDropdown');
    databaseDropdown.addEventListener('change', () => {
      const selectedDatabase = databaseDropdown.value;
      selectDatabase(selectedDatabase)
        .then(() => {
          console.log('Database selection successful');
          window.location.reload(); // Refresh the page
        })
        .catch(error => {
          console.error('Error selecting database:', error);
        });
    });
  });
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{padding: 10}}> 
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        <Select id="databaseDropdown"  value={valueDatabase} label="Select Database" onChange={(e) => {setValueDatabase(e.target.value)}}> 
          <MenuItem value="no-value">Select Database</MenuItem>
          <MenuItem value="db1">Database 1</MenuItem>
          <MenuItem value="db2">Database 2</MenuItem>
          <MenuItem value="db3">Database 3</MenuItem>
          <MenuItem value="db4">Database 4</MenuItem>
          <MenuItem value="db5">Database 5</MenuItem>
        </Select>

    
        
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<CartIcon />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>

        {!user && (
          <Item key="register" icon={<UserAddOutlined />} className="">
            <Link to="/register">Register</Link>
          </Item>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="">
            <Link to="/login">Login</Link>
          </Item>
        )}

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
            className="float-right"
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "buyer" && (
              <Item>
                <Link to="/user/upgrade-seller">Upgrade to Seller</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "seller" && (
              <Item>
                <Link to="/seller/dashboard">Seller Dashboard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        <span className="ml-auto p-1">
          <Search />
        </span>
      </Menu>
    </>

  );
};

export default Header;