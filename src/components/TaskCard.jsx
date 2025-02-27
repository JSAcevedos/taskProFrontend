import { useNavigate } from "react-router"
import Checkbox from "./Checkbox"
import Button from "./Button"
import { toggleTaskCompletion } from "../requests/task"

export default function TaskCard({ id, title, dueDate, completed, priority, isChecked, handleTaskCheck, updateTaskCompletion, isPastDue }) {
  const navigate = useNavigate()

  const onCheckboxChange = (e) => {
    handleTaskCheck(id, e.target.checked)
  }

  const handleCheckboxClick = (e) => {
    e.stopPropagation()
  }

  const handleButtonClick = async (e) => {
    e.stopPropagation()
    const newState = !completed
    await toggleTaskCompletion(id, newState)
    updateTaskCompletion(id, newState)
  }

  return (
    <div 
      onClick={() => navigate(`/task/${id}`)} 
      className={`border-2 border-secondary p-4 mb-4 rounded-lg cursor-pointer hover:bg-gray-100 ${completed ? "line-through text-secondary" : ""} ${isPastDue && !completed ? "bg-past-due hover:bg-past-due-hover" : ""}`}
    >
      <div className="flex justify-between items-center mb-2">
        <Checkbox isChecked={isChecked} checkHandler={onCheckboxChange} onClick={handleCheckboxClick} />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{dueDate.split("T")[0]}</p>
        <p className="text-sm">{completed ? "Completed" : "Not Completed"}</p>
        <p className="text-sm">{`Priority: ${priority}`}</p>
      </div>
      <div className="flex justify-end mt-4 no-underline">
        <Button 
          onClick={handleButtonClick} 
          className="py-1 max-w-[9rem]" 
          valueLabel={completed ? "Undo" : "Complete"} 
        />
      </div>
    </div>
  )
}