import React, { useState } from 'react'
import { useSelector} from "react-redux";
import { upgradeSeller } from '../../functions/user';
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import TextField from '@mui/material/TextField';

const UpgradeSeller = () => {

    const [name, setName] = useState("");
    const [cardDetail, setCardDetail] = useState("");
    const [nameSaved, setNameSaved] = useState("false");
    const [isChecked, setIsChecked] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = async (e) => {
        if(!cardDetail){
            toast.error("Cart Detail not empty!");
            return;
        }
        if(!name){
            toast.error("Name not empty!");
            return;
        }
        upgradeSeller(user.token, name, cardDetail).then((res) => {
            if (res.data.ok) {
                setNameSaved(true);
                toast.success("Address saved");
            }
        });
    }

    const showName = () => (
        <>
          <Box style={{width: 800, margin: "auto", marginTop: 30, background: "#FFFFFF", borderRadius: 6, boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)", padding: 20}}>
            <Typography style={{fontWeight: "bold"}}>User Information</Typography>
            <TextField label="Name User" fullWidth value={name} onChange={(e) => {setName(e.target.value)} } style={{marginTop: 10}} required/>
            <TextField label="Cart Detail" fullWidth style={{marginTop: 20}} required  value={cardDetail} onChange={(e) => {setCardDetail(e.target.value)}}/>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Agree to the rules of the website" onChange={(e, checked) => {setIsChecked(checked)}} checked={isChecked}/>
            <br/>
            <Button 
                style={{
                    background: !isChecked ? "" : "#0088FF",
                    color: !isChecked ? "" : "#FFFFFF",
                    border: !isChecked ? "1px solid #e0e0e0" : "", 
                }}
            onClick={handleSubmit}>
                Save
            </Button>
          </Box>
        </>
      );

    return (
        <div>
            {showName()}
        </div>
    )
}

export default UpgradeSeller;