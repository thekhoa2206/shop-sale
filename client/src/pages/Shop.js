import { Box, IconButton, Typography } from "@material-ui/core";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import { Checkbox, Menu, Radio, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";
import { getCategories } from "../functions/category";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/product";
import { getSubs } from "../functions/sub";
import ProductCardV2 from "../components/cards/ProductCartV2";
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [typeShow, setTypeShow] = useState(false);
  const [residents, setResidents] = useState([
    "Tay Ho", "Ba Dinh", "Hoan Kiem", "Dong Da", "Cau Giay", "Hai Ba Trung", "Hoang Mai", "Long Bien"
  ]);
  const [resident, setResident] = useState("");
  const [colors, setColors] = useState([
    "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Gray", "Brown", "Cyan", "Navy"
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setResident("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setResident("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setResident("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setResident("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on resident name
  const showResidents = () =>
    residents.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === resident}
        onChange={handleResident}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleResident = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setResident(e.target.value);
    setShipping("");
    fetchProducts({ resident: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
      key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setResident("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setResident("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid" style={{width: "100%"}}>
      <Box style={{width: "90%", margin: "auto"}}>
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <Box style={{display: "flex"}}>
                  <MonetizationOnOutlinedIcon style={{marginTop: 4, marginRight: 5,color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Price
                 </Typography>
                </Box>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <Box style={{display: "flex"}}>
                  <CategoryOutlinedIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Categories
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <Box style={{display: "flex"}}>
                  <StarOutlineIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Rating
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <Box style={{display: "flex"}}>
                  <CategoryOutlinedIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Sub Categories
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* residents */}
            <SubMenu
              key="5"
              title={
                <Box style={{display: "flex"}}>
                  <WhereToVoteOutlinedIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Residents
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showResidents()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <Box style={{display: "flex"}}>
                  <ColorLensOutlinedIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Colors
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <Box style={{display: "flex"}}>
                  <LocalShippingOutlinedIcon style={{marginTop: 4, marginRight: 5, color: "#0088FF"}}/> 
                  <Typography variant="h6">
                  Shipping
                 </Typography>
                </Box>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          <Box style={{display: "flex"}}>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          <Box style={{marginLeft: "80%"}}>
            <IconButton onClick={() => {setTypeShow(false)}}><StorageOutlinedIcon/></IconButton>
            <IconButton onClick={() => {setTypeShow(true)}}><ViewModuleOutlinedIcon/></IconButton>
          </Box>
          </Box>
          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              typeShow ? <div key={p._id} className="col-md-3 mt-3">
              <ProductCard product={p} />
            </div> :
              <Box><ProductCardV2  product={p} /></Box>
            ))}
          </div>
        </div>
      </div>
      </Box>
        
    </div>
  );
};

export default Shop;
