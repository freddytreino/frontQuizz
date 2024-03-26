import axios from "axios";

export const AxiosClient = axios.create({
    baseURL: 'https://backquizz.onrender.com'
})


export default AxiosClient
