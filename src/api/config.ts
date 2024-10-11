import axios from "axios";

const authInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const fileInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

export default authInstance;