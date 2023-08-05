import {
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Box, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import { Badge } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import CartIcon from "../svg/CartIcon";
const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [valueDatabase, setValueDatabase] = useState("no-value");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAnChorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElDb, setAnchorElDb] = React.useState(null);
  const openDb = Boolean(anchorElDb);
  const handleClickAnChorElDb = (event) => {
    setAnchorElDb(event.currentTarget);
  };
  const handleCloseDb = () => {
    setAnchorElDb(null);
  };
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

  const isAdmin = () => {
    let url = window.location.pathname;
    return url.includes("admin") || false;
  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   const databaseDropdown = document.getElementById('databaseDropdown');
  //   databaseDropdown.addEventListener('change', () => {
  //     const selectedDatabase = databaseDropdown.value;
  //     selectDatabase(selectedDatabase)
  //       .then(() => {
  //         console.log('Database selection successful');
  //         window.location.reload(); // Refresh the page
  //       })
  //       .catch(error => {
  //         console.error('Error selecting database:', error);
  //       });
  //   });
  // });
  return (
    <>
    <Box style={{width: "100%", height: 82, background: "#FFFFFF", paddingTop: 15, paddingBottom: 15, marginLeft: "auto", marginRight: "auto", zIndex: 5, position: "relative", boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)"}}>
      <Box style={{overflow: "visible", width: "100%", maxWidth: 1360, marginLeft: "auto", marginRight: "auto", paddingLeft: 40, paddingRight: 40}}>
        {!isAdmin() ? (
          <Box style={{display: "flex", justifyContent: "space-between", marginTop: 5, alignItems: "center"}}>
          <Box onClick={() => {window.location.href = "/"}} style={{cursor: "pointer"}}><Typography style={{fontSize: 25, fontWeight: "bold"}}>ShopCart</Typography></Box>
          <Box onClick={() => {window.location.href = "/"}} style={{display: "flex", cursor: "pointer"}}><HomeOutlinedIcon  style={{marginRight: 5, width: 18}}/><Typography style={{fontSize: 16}}>Home</Typography></Box>
          {/* <Box style={{display: "flex", cursor: "pointer"}}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickAnChorEl}
          ><Typography style={{fontSize: 16}}>Category</Typography>
            <ArrowDropDownOutlinedIcon style={{marginLeft: 5}}/>
            </Box> */}
          <Box>
            <Box style={{display: "flex", cursor: "pointer"}}
            id="button-database"
            aria-controls={openDb ? 'basic-database' : undefined}
            aria-haspopup="true"
            aria-expanded={openDb ? 'true' : undefined}
            onClick={handleClickAnChorElDb}
            >
              <StorageIcon style={{marginRight: 5}}/>
              <Typography style={{fontSize: 16}}>Select Database</Typography>
            </Box>
            <Menu
            id="basic-database"  
            anchorEl={anchorElDb}
            open={openDb}
            onClose={handleCloseDb}
            MenuListProps={{
              'aria-labelledby': 'button-database',
            }}
            style={{marginTop: 30}}
            onClick={() => {handleCloseDb();}}
            > 
              <MenuItem value="no-value">Select Database</MenuItem>
              <MenuItem value="db1">Database 1</MenuItem>
              <MenuItem value="db2">Database 2</MenuItem>
              <MenuItem value="db3">Database 3</MenuItem>
              <MenuItem value="db4">Database 4</MenuItem>
              <MenuItem value="db5">Database 5</MenuItem>
            </Menu>
          </Box>
          <Box style={{marginTop: 5}}><Search /></Box>
          <Box style={{display: "flex", cursor: "pointer"}} onClick={() => {window.location.href = "/shop"}}><ShoppingOutlined style={{marginRight: 5, marginTop: 3}}/><Typography style={{fontSize: 16}}>Shop</Typography></Box>
          <Box style={{display: "flex", cursor: "pointer"}} onClick={() => {window.location.href = "/cart"}}>
            <CartIcon style={{marginRight: 5, width: 18 }}/>
            <Badge count={cart.length} offset={[9, 0]}>
              <Typography style={{fontSize: 16}}>Cart</Typography>
            </Badge></Box>

          {!user && (
            <Box style={{display: "flex", cursor: "pointer"}} onClick={() => {window.location.href = "/register"}}>
              <UserAddOutlined style={{marginRight: 5, marginTop: 3}}/>
              <Typography style={{fontSize: 16}}>Register</Typography>
            </Box>
          )}
          {!user && (
            <Box style={{display: "flex", cursor: "pointer"}} onClick={() => {window.location.href = "/login"}}>
              <UserOutlined style={{marginRight: 5, marginTop: 3}}/>
              <Typography style={{fontSize: 16}}>Login</Typography>
            </Box>
          )}
          {
            user && (
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickAnChorEl}
                startIcon={<SettingOutlined />}
                >
                  {user.email && user.email.split("@")[0]}
                </Button>
            )
          }
          {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              style={{marginTop: 40}}
            >
            {user && user.role === "subscriber" && (
              <MenuItem>
                <Typography style={{fontSize: 16}}>
                  <Link to="/user/history" onClick={handleClose}>Dashboard</Link>
                </Typography>
              </MenuItem>
              
            )}

            {user && user.role === "buyer" && (
               <MenuItem><Typography style={{fontSize: 16}}>
                <Link to="/user/upgrade-seller">Upgrade to Seller</Link>
              </Typography></MenuItem>
            )}

            {user && user.role === "admin" && (
              <MenuItem><Typography style={{fontSize: 16}}>
                <Link to="/admin/dashboard" onClick={handleClose}>Dashboard</Link>
              </Typography></MenuItem>
            )}

            {user && user.role === "seller" && (
              <MenuItem><Typography style={{fontSize: 16}}>
                <Link to="/seller/dashboard">Seller Dashboard</Link>
              </Typography></MenuItem>
            )}
            <MenuItem><Box style={{display: "flex", cursor: "pointer"}} onClick={() => {logout();}}>
              <LogoutOutlined style={{marginRight: 5, marginTop: 3}}/>
              <Typography style={{fontSize: 16}}>Logout</Typography>
            </Box></MenuItem>
            </Menu>
        )}
        </Box>
        ) : (
          <Box style={{marginTop: 5, alignItems: "center", display: "flex", justifyContent: "space-between"}}>
          <Box onClick={() => {window.location.href = "/"}} style={{cursor: "pointer"}}><Typography style={{fontSize: 25, fontWeight: "bold"}}>ShopCart</Typography></Box>
            {
              user && (
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickAnChorEl}
                  startIcon={<SettingOutlined />}
                  >
                    {user.email && user.email.split("@")[0]}
                  </Button>
              )
            }
            {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              style={{marginTop: 40}}
            >
                <MenuItem><Box style={{display: "flex", cursor: "pointer"}} onClick={() => {logout();}}>
                  <LogoutOutlined style={{marginRight: 5, marginTop: 3}}/>
                  <Typography style={{fontSize: 16}}>User info</Typography>
                </Box></MenuItem>
                <MenuItem><Box style={{display: "flex", cursor: "pointer"}} onClick={() => {logout();}}>
                  <LogoutOutlined style={{marginRight: 5, marginTop: 3}}/>
                  <Typography style={{fontSize: 16}}>Logout</Typography>
                </Box></MenuItem>
                </Menu>
            )}
          </Box>
        )}
      </Box>
    </Box>
      {/* <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{padding: 10}}>
        

        

        <span className="ml-auto p-1">
         
        </span>
      </Menu> */}
    </>

  );
};

export default Header;