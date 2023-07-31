import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { TextField } from "@material-ui/core";
import "../css/Search.css"
// import { DropdownButton, Dropdown } from "react-bootstrap";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      {/* <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
        <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>All</Dropdown.Item>
        {categories.map((category, id) => (
          <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>{category.name}</Dropdown.Item>
        ))}
      </DropdownButton> */}
      <TextField
        onChange={handleChange}
        type="search"
        variant="outlined"
        style={{borderRadius: 30}}
        value={text}
        placeholder="Search"
        InputProps={{
          endAdornment: <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer", color: "#B0BABF" }} />,
        }}
      />
      
    </form>
  );
};

export default Search;