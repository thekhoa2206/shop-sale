import React from "react";
import Select from '@mui/material/Select';
import { Box, Paper, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  showSub,
  handleChangeColor,
  handleChangeResident,
  handleChangeSub,
  handleChangeShipping

}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    residents,
    color,
    resident,
  } = values;

  return (
    <Box padding={2}>
      <form onSubmit={handleSubmit}>
        <Paper style={{ height: "80px" }}>
          <Box display={"flex"} padding={2} height={30}>
            <TextField
              id="outlined-basic" variant="outlined"
              label="Title"
              type="text"
              fullWidth
              onChange={handleChange}
              size="small"
            />
            <TextField
              style={{ marginLeft: 12 }}
              id="Description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              size="small"
            />
          </Box>
        </Paper>
        <Paper style={{ height: "80px", marginTop: 24 }}>
          <Box display={"flex"} padding={2} height={30}>
            <FormControl fullWidth >
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                endAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                onChange={handleChange}
                value={price}
                name="price"
                size="small"
              />
            </FormControl>
            <TextField
              fullWidth
              style={{ marginLeft: 12 }}
              id="outlined-number"
              label="quantity"
              type="number"
              value={quantity}
              onChange={handleChange}
              name="quantity"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
          </Box>
        </Paper>
        <Paper style={{ height: "80px", marginTop: 24 }}>
          <Box display={"flex"} padding={2} height={30}>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                onChange={handleChangeColor}
                label="Color"
              >
                {colors.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginLeft: 12 }}>
              <InputLabel id="demo-simple-select-label">Sub</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resident}
                onChange={handleChangeResident}
                label="Resident"
              >
                {residents.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
        <Paper style={{ height: "80px", marginTop: 24 }}>
          <Box padding={2} height={30}>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={handleCatagoryChange}
                label="Category"
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* {showSub ? (<FormControl fullWidth style={{ marginLeft: 12 }}>
              <InputLabel id="demo-simple-select-label">Resident</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resident}
                onChange={handleChangeSub}
                label="Resident"
              >
                {subOptions.length && subOptions.map((c) => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>) : ""
            } */}

          </Box>
        </Paper>
        <Paper style={{ height: "150px", marginTop: 24 }}>
          <Box display={"flex"} padding={2} height={30}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="description"
              multiline
              rows={4}
              defaultValue="Default Value"
              name="description"
              onChange={handleChange}
            />
            <FormControl fullWidth style={{ marginLeft:"24px" }}>
              <InputLabel id="demo-simple-select-label">shipping</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shipping}
                onChange={handleChangeShipping}
                label="shipping"
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>

              </Select>
            </FormControl>
          </Box>
        </Paper>
        {/* <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Resident</label>
          <select name="resident" className="form-control" onChange={handleChange}>
            <option>Please select</option>
            {residents.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCatagoryChange}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {showSub && (
          <div>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={handleChangeSub}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )} */}

        <br />
        <button className="btn btn-outline-info">Save</button>
      </form>
    </Box>
  );
};

export default ProductCreateForm;
