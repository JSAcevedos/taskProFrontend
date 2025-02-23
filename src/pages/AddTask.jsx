import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { createTask } from "../requests/task"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import PriorityButtons from "../components/PriorityButtons"
import Button from "../components/Button"

export default function AddTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    completed: false
  })
  const navigate = useNavigate()

  const handleSelectPriority = (priority) => {
    setTask({ ...task, priority })
  }

  const handleCreateTask = async (event) => {
    event.preventDefault()
    const today = new Date().toISOString().split('T')[0]
    if (task.dueDate < today) {
      toast.error('Due date cannot be in the past')
      return
    }
    try {
      await createTask(task)
      toast.success('Task created successfully')
      navigate('/tasks')
    } catch (error) {
      toast.error('Failed to create task: ' + error)
    }
  }

  return (
    <div className="p-20 text-xl">
      <h1 className="text-3xl mb-6">Add Task</h1>
      <form className="space-y-6" onSubmit={handleCreateTask}>
        <Input 
          type="text" 
          label="Title:" 
          value={task.title} 
          onChange={(event) => setTask({ ...task, title: event.target.value })} 
        />
        <TextArea 
          label="Description:" 
          value={task.description} 
          onChange={(event) => setTask({ ...task, description: event.target.value })} 
        />
        <Input 
          type="date" 
          label="Due Date:" 
          value={task.dueDate} 
          min={new Date().toISOString().split('T')[0]}
          onChange={(event) => setTask({ ...task, dueDate: event.target.value })} 
        />
        <label>Priority:</label>
        <PriorityButtons 
          selectedPriority={task.priority} 
          onSelectPriority={handleSelectPriority} 
        />
        <div>
          <Button valueLabel="Create Task" type="submit"/>
        </div>
      </form>
    </div>
  )
}
