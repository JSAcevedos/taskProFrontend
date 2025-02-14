import axios from "axios"
import { config } from "../config/config"

export const login = async (email, password) => {
    return axios.post(config.apiUrl + '/user/login', {
        email: email,
        password: password
    })
}