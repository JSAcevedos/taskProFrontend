import createAxiosInstance from './authAxiosInstance'

export const createTask = async (task) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.post('/task/create-task', task)
}

export const getAllTasks = async () => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.get('/task/get-all-tasks')
}

export const getTask = async (taskId) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.get('/task/get-task/' + taskId)
}

export const toggleTaskCompletion = async (id, state) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/task/update-task/' + id, {
    completed: state
  })
}

export const updateTask = async (id, task) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/task/update-task/' + id, task)
}

export const completeAllTasks = async (tasks) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.patch('/task/complete-tasks', tasks)
}

export const deleteTask = async (taskId) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.delete('/task/delete-task', {
    data: {
      taskId: taskId
    } 
  })
}

export const deleteAllTasks = async (tasks) => {
  const axiosInstance = await createAxiosInstance()
  return axiosInstance.delete('/task/delete-multiple-tasks', {
    data: tasks
  })
}