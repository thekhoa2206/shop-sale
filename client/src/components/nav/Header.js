import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import { selectDatabase } from "../../functions/db";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

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
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <select id="databaseDropdown" selected="">
          <option value="">Select Database</option>
          <option value="db1">Database 1</option>
          <option value="db2">Database 2</option>
          <option value="db3">Database 3</option>
          <option value="db4">Database 4</option>
          <option value="db5">Database 5</option>
        </select>

        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
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