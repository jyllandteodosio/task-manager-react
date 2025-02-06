'use client'
import { useState } from 'react'
import AddTaskForm from "./AddTaskForm"

const AddTask = () => {
	const [formState, setFormState] = useState(false)

	const handleAddTask = () => {
		setFormState(true)
	}

	return (
		<>
			{formState ? <AddTaskForm /> : <button id="add-task" onClick={handleAddTask} className="mt-4 py-3 px-2 text-sm font-semibold w-full rounded-md hover:bg-gray-800">
				Add Task
			</button>}
			
		</>
	)
}

export default AddTask