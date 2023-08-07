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
  console.log(subs);
  return (
    <Box padding={2}>
      <form onSubmit={handleSubmit}>
        <Paper >
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
              id="outlined-basic" variant="outlined"
              label="description"
              type="text"
              fullWidth
              onChange={handleChange}
              size="small"
              style={{ marginLeft: 12 }}
            />
          </Box>
          <Box display={"flex"} padding={2} height={30}  marginTop={5}>
            <FormControl fullWidth >
              <InputLabel htmlFor="outlined-adornment-amount" style={{marginTop: -7}}>Price</InputLabel>
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
              <InputLabel id="demo-simple-select-label" style={{marginTop: -7}}>Color</InputLabel>
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
              <InputLabel id="demo-simple-select-label" style={{marginTop: -7}}>Resident</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resident}
                onChange={handleChangeResident}
                label="Resident"
                required
              >
                {residents.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box padding={2}  marginTop={5}>
             <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label" style={{marginTop: -7}}>Category</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) =>{handleCatagoryChange(e)}}
                label="Category"
                required
              
              >
                {categories && categories.length > 0 &&
                  categories.map((c) => (
                    c._id && <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            {showSub ? (<FormControl fullWidth style={{ marginTop: 12 }}>
              <InputLabel  labelId="demo-multiple-name-label" style={{marginTop: -7}}>Sub Categories</InputLabel>
              <Select
                size="small"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={subs}
                multiple
                onChange={handleChangeSub}
                label="Sub Categories"
                input={<OutlinedInput label="sub-category" />}
              >
                {subOptions && subOptions.length > 0 && subOptions.map((c) => (
                c && c._id &&  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>) : ""
            }

          </Box>
        </Paper>
        <Paper style={{ height: "100px", marginTop: 24 }}>
          <Box display={"flex"} padding={2} height={30}>

            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label" style={{marginTop: -7}}>Shipping</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shipping}
                onChange={handleChangeShipping}
                label="Shipping"
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

export default ProductCreateForm;
