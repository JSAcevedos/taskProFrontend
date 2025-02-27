export const filterAndSortTasks = (tasks, filter, sort) => {
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
  } else if (sort === 'nameAsc') {
    updatedTasks.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort === 'nameDesc') {
    updatedTasks.sort((a, b) => b.title.localeCompare(a.title))
  }

  const notCompletedTasks = updatedTasks.filter(task => !task.completed)
  const completedTasks = updatedTasks.filter(task => task.completed)

  return notCompletedTasks.concat(completedTasks)
}