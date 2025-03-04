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
		}, 0);
	}

	const handleCancelTask = () => {
		setFormState(false);
	}

	return (
		<>
			{formState ? (
				<div id="add-task-wrapper" ref={formRef}>
					<AddTaskForm onCancel={handleCancelTask} />
				</div>
			) : (
				<button id="add-task" data-testid="add-task" onClick={handleAddTask} className="py-3 px-4 mt-4 text-sm font-semibold w-full text-left rounded-sm bg-indigo-900 hover:bg-indigo-950">
					Add Task
				</button>
			)
			}

		</>
	)
}

export default AddTask