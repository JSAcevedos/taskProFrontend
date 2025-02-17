import axios from "axios"
import { config } from "../config/config"

const token = localStorage.getItem('authToken')

const axiosInstance = axios.create({
  baseURL: config.apiUrl
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getUser = async () => {
  return axiosInstance.get('/user/get-user')
}

export const updateUserInfo = async (name, email) => {
  return axiosInstance.patch('/user/update-user',
      {
        name: name,
        email: email
      }
  )
}

export const updatePassword = async (password, newPassword) => {
    return axiosInstance.patch('/user/update-password',
        {
          password: password,
          newPassword: newPassword
        }
    )
}

export const deleteAccount = async (password) => {
  return axiosInstance.delete('/user/delete-user',
      {
        data: {
          password: password
        }
      }
  )
}
