import { useNavigate } from "react-router"
import Checkbox from "./Checkbox"
import Button from "./Button"
import { toggleTaskCompletion } from "../requests/task"

export default function TaskItem({ id, title, dueDate, completed, isChecked, handleTaskCheck, updateTaskCompletion }) {
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
    <tr onClick={() => navigate(`/task/${id}`)} className={`border-y-2 border-secondary h-20 text-lg cursor-pointer hover:bg-gray-100 ${completed && "line-through text-secondary hover:bg-gray-200 bg-gray-200"}`}>
      <td>
        <Checkbox isChecked={isChecked} checkHandler={onCheckboxChange} onClick={handleCheckboxClick} />
      </td>
      <td>{title}</td>
      <td>{dueDate.split("T")[0]}</td>
      <td>{completed ? "Yes" : "No"}</td>
      <td>
        <Button onClick={handleButtonClick} className="py-1 max-w-[9rem] opacity-100" valueLabel={completed ? "Undo" : "Complete"} />
      </td>
    </tr>
  )
}
