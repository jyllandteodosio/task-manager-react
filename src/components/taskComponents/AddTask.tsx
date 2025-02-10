'use client'
import { useState, useRef } from 'react'
import AddTaskForm from "./AddTaskForm"

const AddTask = () => {
	const [formState, setFormState] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const handleAddTask = () => {
		setFormState(true);

		setTimeout(() => {
			formRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest"
			});
		},0);
	}

	const handleCancelTask = () => {
		setFormState(false);
	}

	return (
		<>
			{formState ? (
				<div ref={formRef}>
					<AddTaskForm onCancel={handleCancelTask}/>
				</div>
			) : (
				<button id="add-task" onClick={handleAddTask} className="mt-4 py-3 px-2 text-sm font-semibold w-full rounded-md hover:bg-gray-800">
				Add Task
			</button>
			)
			}
			
		</>
	)
}

export default AddTask