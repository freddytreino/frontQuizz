import axios from "axios";

export const AxiosClient = axios.create({
    baseURL: 'localhost:4000'
})


export default AxiosClient
