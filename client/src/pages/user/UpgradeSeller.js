import React, { useState } from 'react'
import { useSelector} from "react-redux";
import { upgradeSeller } from '../../functions/user';
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpgradeSeller = () => {

    const [name, setName] = useState("");
    const [nameSaved, setNameSaved] = useState("false");
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = async (e) => {
        upgradeSeller(user.token, name).then((res) => {
            if (res.data.ok) {
                setNameSaved(true);
                toast.success("Address saved");
            }
        });
    }

    const showName = () => (
        <>
          <ReactQuill theme="snow" value={name} onChange={setName} />
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Save
          </button>
        </>
      );

    return (
        <div>
            {showName()}
        </div>
    )
}

export default UpgradeSeller;