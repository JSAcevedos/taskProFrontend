import { useContext, useEffect, useState } from "react"
import TaskTable from "../components/TaskTable"
import { getAllTasks, completeAllTasks, deleteAllTasks } from "../requests/task"
import LoadingContext from "../context/LoadingContext"
import { toast } from "react-toastify"
import TaskFilterSort from "../components/TaskFilterSort"
import Button from "../components/Button"
import ConfirmationModal from "../components/ConfirmationModal"
import { filterAndSortTasks } from "../utils/taskUtils"

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [checkedTasks, setCheckedTasks] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState(null)
  const handleLoading = useContext(LoadingContext)
  const generalButtonsClass = "max-w-[9rem] w-[9rem] py-1"

  const checkHandler = () => {
    setIsAllChecked((prev) => {
      const newCheckedStatus = !prev
      const updatedCheckedTasks = tasks.reduce((acc, task) => {
        acc[task._id] = newCheckedStatus
        return acc
      }, {})
      setCheckedTasks(updatedCheckedTasks)
      return newCheckedStatus
    })
  }

  const handleTaskCheck = (taskId, isChecked) => {
    setCheckedTasks((prev) => {
      const updatedCheckedTasks = { ...prev, [taskId]: isChecked }
      const allChecked = Object.values(updatedCheckedTasks).every((status) => status)
      setIsAllChecked(allChecked)
      return updatedCheckedTasks
    })
  }

  const updateTaskCompletion = (taskId, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed } : task
      )
    )
  }

  const handleDeleteAll = async (selectedTaskIds) => {
    await deleteAllTasks(selectedTaskIds)
    setTasks((prevTasks) => prevTasks.filter((task) => !checkedTasks[task._id]))
    setCheckedTasks({})
    setIsAllChecked(false)
  }

  const handleCompleteAll = async (selectedTaskIds) => {
    await completeAllTasks(selectedTaskIds)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        checkedTasks[task._id] ? { ...task, completed: true } : task
      )
    )
  }

  const openModal = (action) => {
    setModalAction(action)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalAction(null)
  }

  const getSelectedTaskIds = () => {
    return Object.keys(checkedTasks).filter((taskId) => checkedTasks[taskId])
  }

  const confirmModalAction = () => {
    const selectedTaskIds = getSelectedTaskIds()

    if (modalAction === 'delete') {
      handleDeleteAll(selectedTaskIds)
    } else if (modalAction === 'complete') {
      handleCompleteAll(selectedTaskIds)
    }
    setCheckedTasks((prevTasks) => {
      const updatedCheckedTasks = Object.keys(prevTasks).reduce((acc, taskId) => {
        acc[taskId] = false
        return acc
      }, {})
      return updatedCheckedTasks
    })
    setIsAllChecked(false)
    closeModal()
  }

  const clearFilter = () => {
    setFilter('')
  }

  useEffect(() => {
    handleLoading(true)

    const loadTasks = async () => {
      getAllTasks()
      .then((response) => {
        setTasks(response.data)
        setFilteredTasks(response.data)
        const initialCheckedTasks = response.data.reduce((acc, task) => {
          acc[task._id] = false
          return acc
        }, {})
        setCheckedTasks(initialCheckedTasks)
      })
      .catch((error) => toast.error("Failed to load tasks: " + error))
      .finally(() => handleLoading(false))
    }
    loadTasks()
  }, [])

  useEffect(() => {
    const updatedTasks = filterAndSortTasks(tasks, filter, sort)
    setFilteredTasks(updatedTasks)
  }, [filter, sort, tasks])

  const areAnyTasksChecked = Object.values(checkedTasks).some((isChecked) => isChecked)

  return (
    <div className="flex flex-col lg:mt-20 mt-25 items-center h-full max-w-400">
        <h1 className="text-4xl">Your Tasks</h1>
        <p className="text-lg text-center">Click on a task to view more details</p>
        <TaskFilterSort onFilterChange={setFilter} onSortChange={setSort} clearFilter={clearFilter} />
        <div className="flex lg:flex-row flex-col lg:px-30 text-center lg:space-x-5 lg:space-y-0 space-y-5 lg:flex-row border-2 border-secondary rounded-md p-3 justify-center items-center">
          <h2 className="font-semibold">General Actions</h2>
          <Button
            valueLabel="Complete All"
            className={generalButtonsClass}
            onClick={() => openModal('complete')}
            isDisabled={!areAnyTasksChecked}
          />
          <Button
            valueLabel="Delete All"
            className={generalButtonsClass + " hover:bg-alert-hover"}
            customBackground="bg-alert"
            addCustomHoverBackground={true}
            onClick={() => openModal('delete')}
            isDisabled={!areAnyTasksChecked}
          />
        </div>
        <TaskTable
          tasks={filteredTasks}
          isAllChecked={isAllChecked}
          checkedTasks={checkedTasks}
          checkHandler={checkHandler}
          handleTaskCheck={handleTaskCheck}
          updateTaskCompletion={updateTaskCompletion}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmModalAction}
          message={modalAction === 'delete' ? "Are you sure you want to delete all selected tasks?" : "Are you sure you want to mark all selected tasks as completed?"}
        />
    </div>
  )
}