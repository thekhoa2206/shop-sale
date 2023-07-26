import axios from "axios";

export const selectDatabase = async (database) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/switch-db`, {database});
        console.log(response.data);
        console.log('Database selection successful');
    } catch (error) {
        console.error ("Error selecting database", error);
    }
}