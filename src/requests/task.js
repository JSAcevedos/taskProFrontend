import createAxiosInstance from './authAxiosInstance'

export const getAllTasks = async () => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.get('/task/get-all-tasks')
}

export const toggleTaskCompletion = async (id, state) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/task/update-task/' + id, {
    completed: state
  })
}

export const completeAllTasks = async (tasks) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/task/complete-tasks', tasks)
}

export const deleteAllTasks = async (tasks) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.delete('/task/delete-multiple-tasks', {
    data: tasks
  })
}