import { useContext, useEffect, useState } from "react"
import { getTask, updateTask, deleteTask } from "../requests/task"
import LoadingContext from "../context/LoadingContext"
import { useParams, useNavigate } from "react-router"
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import { toast } from "react-toastify"
import Button from "../components/Button"
import PriorityButtons from "../components/PriorityButtons"
import BackButton from "../components/BackButton"
import TextArea from "../components/TextArea"
import ConfirmationModal from "../components/ConfirmationModal"

export default function Task() {
    const [initialTask, setInitialTask] = useState(null)
    const [isModified, setIsModified] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleLoading = useContext(LoadingContext)
    const taskId = useParams().taskId
    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        completed: false
    })

    useEffect(() => {
        handleLoading(true)
        const loadTaskData = async () => {
            getTask(taskId)
            .then((response) => {
                const taskData = response.data
                if (taskData.dueDate) {
                    taskData.dueDate = new Date(taskData.dueDate).toISOString().split('T')[0]
                }
                setTask(taskData)
                setInitialTask(taskData)
            })
            .catch((error) => toast.error('Failed to load task data ' + error))
            .finally(() => handleLoading(false))
        }
        loadTaskData()
    }, [])

    useEffect(() => {
        if (initialTask) {
            setIsModified(JSON.stringify(task) !== JSON.stringify(initialTask))
        }
    }, [task, initialTask])

    const handleUpdateTask = async () => {
        handleLoading(true)
        try {
            await updateTask(taskId, task)
            setInitialTask(task)
            toast.success('Task updated successfully')
        } catch (error) {
            toast.error(error)
        } finally {
            handleLoading(false)
        }
    }

    const handleDeleteTask = async () => {
        handleLoading(true)
        try {
            await deleteTask(taskId)
            toast.success('Task deleted successfully')
            navigate('/tasks')
        } catch (error) {
            toast.error('Failed to delete task ' + error)
        } finally {
            handleLoading(false)
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const confirmDelete = () => {
        handleDeleteTask()
        closeModal()
    }

    const handleSelectPriority = (priority) => {
        setTask({ ...task, priority })
    }

    return (
        <div className="mx-auto px-10 lg:mt-20 mt-27 max-w-200 text-xl space-y-7">
            <BackButton />
            <Input type="text" label="Title:" value={task.title} onChange={(event) => setTask({...task, title:event.target.value})} />
            <TextArea label="Description:" value={task.description} onChange={(event) => setTask({...task, description:event.target.value})} />
            <label>Priority:</label>
            <PriorityButtons selectedPriority={task.priority} onSelectPriority={handleSelectPriority} />
            <Input type="date" label="Due Date:" value={task.dueDate} onChange={(event) => setTask({...task, dueDate:event.target.value})} />
            <label>
                <Checkbox id="completed" isChecked={task.completed} checkHandler={(event) => setTask({...task, completed:event.target.checked})} />
                Completed
            </label>
            <div className="flex lg:flex-row flex-col lg:space-x-5 lg:space-y-0 space-y-5 mt-5">
                <Button valueLabel="Update Task" isDisabled={!isModified} onClick={handleUpdateTask} />
                <Button valueLabel="Delete Task" customBackground="bg-alert" addCustomHoverBackground={true} className="hover:bg-alert-hover" onClick={openModal} />
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this task?"
            />
        </div>
    )
}
