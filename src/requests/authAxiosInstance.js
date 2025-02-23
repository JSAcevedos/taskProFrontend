import axios from "axios"
import { config } from "../config/config"

const waitForToken = () => {
  return new Promise((resolve) => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        resolve(token)
      } else {
        setTimeout(checkToken, 50)
      }
    }
    checkToken()
  })
}

const createAxiosInstance = async () => {
  await waitForToken()

  const token = localStorage.getItem('authToken')

  const axiosInstance = axios.create({
    baseURL: config.apiUrl,
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

  return axiosInstance
}

export default createAxiosInstance
