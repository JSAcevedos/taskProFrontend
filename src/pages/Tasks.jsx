import TaskTable from "../components/TaskTable"

export default function Tasks() {
  return (
    <div className="flex flex-col lg:mt-20 mt-25 items-center h-full">
        <h1 className="text-4xl">Your Tasks</h1>
        <p className="text-lg text-center">Click on a task to view more details</p>
        <TaskTable />
    </div>
  )
}
