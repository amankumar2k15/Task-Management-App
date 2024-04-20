import axios from "axios";
import { getToken } from "../helper/tokenHelper";

const { VITE_BACKEND_PORT_DEVELOPMENT } = import.meta.env

axios.interceptors.request.use((config) => {
    const token = getToken()
    // console.log("gettoken", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

// Auth 
export const RegisterUser = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}/user/register`, data)
}

export const LoginUser = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}/user/login`, data, config)
}

// Task
export const CreateTaskApi = async (data) => {
    return await axios.post(`${VITE_BACKEND_PORT_DEVELOPMENT}/task/create-task`, data, config)
}

export const GetTaskApi = async () => {
    return await axios.get(`${VITE_BACKEND_PORT_DEVELOPMENT}/task/get-task`, config)
}

export const DeleteTaskApi = async (id) => {
    return await axios.delete(`${VITE_BACKEND_PORT_DEVELOPMENT}/task/delete-task/${id}`, config)
}

export const UpdateTaskApi = async (id, data) => {
    return await axios.patch(`${VITE_BACKEND_PORT_DEVELOPMENT}/task/update-task/${id}`, data, config)
}