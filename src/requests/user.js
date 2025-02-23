import createAxiosInstance from './authAxiosInstance'

export const getUser = async () => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.get('/user/get-user')
}

export const updateUserInfo = async (name, email) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/user/update-user', {
    name: name,
    email: email,
  })
}

export const updatePassword = async (password, newPassword) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/user/update-password', {
    password: password,
    newPassword: newPassword,
  })
}

export const deleteAccount = async (password) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.delete('/user/delete-user', {
    data: {
      password: password,
    },
  })
}
