import { useContext, useEffect, useState } from "react"
import { completeAllTasks, deleteAllTasks, getAllTasks } from "../requests/task"
import LoadingContext from "../context/LoadingContext"
import { toast } from "react-toastify"
import TaskItem from "./TaskItem"
import TaskCard from "./TaskCard"
import Checkbox from "./Checkbox"
import Button from "./Button"
import ConfirmationModal from "./ConfirmationModal"

export default function TaskTable() {
  const [tasks, setTasks] = useState([])
  const handleLoading = useContext(LoadingContext)
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [checkedTasks, setCheckedTasks] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState(null)
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

  useEffect(() => {
    handleLoading(true)

    const loadTasks = async () => {
      getAllTasks()
      .then((response) => {
        setTasks(response.data)
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

  const areAnyTasksChecked = Object.values(checkedTasks).some((isChecked) => isChecked)

  return (
    <div className="lg:mx-20 mx-5 my-10 w-full max-w-400 lg:px-20 px-20">
      <div className="flex flex-col flex-wrap lg:space-x-5 lg:space-y-0 space-y-5 lg:flex-row border-2 border-secondary rounded-md p-3 mb-3 justify-center items-center">
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
      {tasks.length === 0 ? (
        <p className="text-center">No task created</p>
      ) : (
        <>
          <div className="hidden lg:block max-h-[35rem] overflow-auto">
            <table className="table-fixed w-full text-center">
              <thead>
                <tr className="space-x-10 h-10 border-2 border-primary">
                  <th><Checkbox isChecked={isAllChecked} checkHandler={checkHandler} /></th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Completed</th>
                  <th>Complete Task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    isChecked={checkedTasks[task._id]}
                    handleTaskCheck={handleTaskCheck}
                    updateTaskCompletion={updateTaskCompletion}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden">
            <div className="mb-4 flex">
              <p>Select all tasks:</p>
              <Checkbox isChecked={isAllChecked} checkHandler={checkHandler} />
            </div>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                dueDate={task.dueDate}
                completed={task.completed}
                isChecked={checkedTasks[task._id]}
                handleTaskCheck={handleTaskCheck}
                updateTaskCompletion={updateTaskCompletion}
              />
            ))}
          </div>
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmModalAction}
        message={modalAction === 'delete' ? "Are you sure you want to delete all selected tasks?" : "Are you sure you want to mark all selected tasks as completed?"}
      />
    </div>
  )
}
