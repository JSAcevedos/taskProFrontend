import TaskItem from "./TaskItem"
import TaskCard from "./TaskCard"
import Checkbox from "./Checkbox"

export default function TaskTable({ tasks, isAllChecked, checkedTasks, checkHandler, handleTaskCheck, updateTaskCompletion }) {
  return (
    <div className="w-full max-w-400 px-10 py-20">
      {tasks.length === 0 ? (
        <>
          <div className="flex flex-col items-center">
            <p className="text-center my-5 text-xl">No task found</p>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:block max-h-[35rem] overflow-auto">
            <table className="table-fixed w-full text-center">
              <thead>
                <tr className="space-x-10 h-10 border-2 border-primary">
                  <th><Checkbox isChecked={isAllChecked} checkHandler={checkHandler} /></th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Priority</th>
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
                    priority={task.priority}
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
                priority={task.priority}
                isChecked={checkedTasks[task._id]}
                handleTaskCheck={handleTaskCheck}
                updateTaskCompletion={updateTaskCompletion}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}