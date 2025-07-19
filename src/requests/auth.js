import axios from "axios"
import { config } from "../config/config"

export const login = async (email, password, captchaToken) => {
    return axios.post(config.apiUrl + '/user/login', {
        email: email,
        password: password,
        captchaToken: captchaToken
    })
}

export const register = async (name, email, password) => {
    return axios.post(config.apiUrl + '/user/create-user', {
        name: name,
        email: email,
        password: password
    })
}

export const recoverPassword = async (email, userId) => {
    return axios.post(config.apiUrl + '/user/recover-password', {
        email: email,
        userId: userId
    })
}

export const resetPassword = async (password) => {
    const token = localStorage.getItem('resetToken')

    return axios.patch(config.apiUrl + '/user/reset-password', 
        {
            password: password
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}