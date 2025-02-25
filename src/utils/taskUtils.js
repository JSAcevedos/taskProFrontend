export const filterAndSortTasks = (tasks, filter, sort) => {
  if (!filter && !sort) {
    return tasks
      .filter(task => !task.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .concat(
        tasks
          .filter(task => task.completed)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      )
  }

  let updatedTasks = [...tasks]

  if (filter) {
    updatedTasks = updatedTasks.filter(task =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.toLowerCase())
    )
  }

  if (sort === 'date') {
    updatedTasks.sort((a, b) => {
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate)
      if (dateComparison !== 0) {
        return dateComparison
      }
      const priorityComparison = b.priority - a.priority
      return priorityComparison
    })
  } else if (sort === 'priority') {
    updatedTasks.sort((a, b) => {
      const priorityComparison = b.priority - a.priority
      if (priorityComparison !== 0) {
        return priorityComparison
      }
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate)
      return dateComparison
    })
  } else if (sort === 'status') {
    updatedTasks.sort((a, b) => a.completed - b.completed)
  }

  return updatedTasks
}