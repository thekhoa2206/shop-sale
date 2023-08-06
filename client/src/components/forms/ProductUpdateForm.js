import React from "react";
import Select from '@mui/material/Select';
import { Box, Button, Paper, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
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
    // <form onSubmit={handleSubmit}>
    //   <div className="form-group">
    //     <label>Title</label>
    //     <input
    //       type="text"
    //       name="title"
    //       className="form-control"
    //       value={title}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Description</label>
    //     <input
    //       type="text"
    //       name="description"
    //       className="form-control"
    //       value={description}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Price</label>
    //     <input
    //       type="number"
    //       name="price"
    //       className="form-control"
    //       value={price}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Shipping</label>
    //     <select
    //       value={shipping === "Yes" ? "Yes" : "No"}
    //       name="shipping"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       <option value="No">No</option>
    //       <option value="Yes">Yes</option>
    //     </select>
    //   </div>

    //   <div className="form-group">
    //     <label>Quantity</label>
    //     <input
    //       type="number"
    //       name="quantity"
    //       className="form-control"
    //       value={quantity}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Color</label>
    //     <select
    //       value={color}
    //       name="color"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       {colors.map((c) => (
    //         <option key={c} value={c}>
    //           {c}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div className="form-group">
    //     <label>Resident</label>
    //     <select
    //       value={resident}
    //       name="resident"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       {residents.map((b) => (
    //         <option key={b} value={b}>
    //           {b}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div className="form-group">
    //     <label>Category</label>
    //     <select
    //       name="category"
    //       className="form-control"
    //       onChange={handleCategoryChange}
    //       value={selectedCategory ? selectedCategory : category._id}
    //     >
    //       {categories.length > 0 &&
    //         categories.map((c) => (
    //           <option key={c._id} value={c._id}>
    //             {c.name}
    //           </option>
    //         ))}
    //     </select>
    //   </div>

    //   <div>
    //     <label>Sub Categories</label>
    //     <Select
    //       mode="multiple"
    //       style={{ width: "100%" }}
    //       placeholder="Please select"
    //       value={arrayOfSubs}
    //       onChange={(value) => setArrayOfSubs(value)}
    //     >
    //       {subOptions.length &&
    //         subOptions.map((s) => (
    //           <Option key={s._id} value={s._id}>
    //             {s.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </div>

    //   <br />
    //   <button className="btn btn-outline-info">Save</button>
    // </form>
    <Box padding={2}>
    <form onSubmit={handleSubmit} fullWidth>
      <Paper >
        <Box display={"flex"} padding={2} height={30}>
          <TextField
            id="outlined-basic" variant="outlined"
            label="Title"
            type="text"
            fullWidth
            onChange={handleChange}
            size="small"
            name="title"
            value={title}
          />
              <TextField
            fullWidth
            id="outlined-multiline-static"
            label="description"
            multiline
            rows={1}
            name="description"
            onChange={handleChange}
            style={{ marginLeft: 12 }}
            value={description}
          />
        </Box>
        <Box display={"flex"} padding={2} height={30}  marginTop={5}>
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

        <Box display={"flex"} padding={2} height={30} marginTop={5} >

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
            <InputLabel id="demo-simple-select-label">Resident</InputLabel>
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
        {/* <Box padding={2}  marginTop={5}>
           <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.length > 0 && categories !== undefined ?
                categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                )):""}
            </Select>
          </FormControl>
          {subs ? (<FormControl fullWidth style={{ marginTop: 12 }}>
            <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subs}
              onChange={handleChangeSub}
              label="Sub Categories"
            >
              {subOptions.length>0 && subOptions !== undefined  ? subOptions.map((c) => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              )):""}
            </Select>
          </FormControl>) : ""
          }

        </Box> */}
      </Paper>
      <Paper style={{ height: "100px", marginTop: 24 }}>
        <Box display={"flex"} padding={2} height={30}>

          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">shipping</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shipping}
              onChange={handleChangeShipping}
              label="shipping"
              fullWidth
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>

            </Select>
          </FormControl>
        </Box>
      </Paper>
     <br />
      <Button variant="contained" color="primary">Save</Button>
    </form>
  </Box>
  );
};

export default ProductUpdateForm;
