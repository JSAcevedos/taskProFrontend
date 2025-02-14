import axios from "axios"
import { config } from "../config/config"

export const login = async (email, password) => {
    return axios.post(config.apiUrl + '/user/login', {
        email: email,
        password: password
    })
}

export const register = async (name, email, password) => {
    return axios.post(config.apiUrl + '/user/create-user', {
        name: name,
        email: email,
        password: password
    })
}