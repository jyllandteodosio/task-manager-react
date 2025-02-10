'use client';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Datepicker from "tailwind-datepicker-react";
import StatusField from "./StatusField";
import { Task } from "@/types/tasks";
import { createTask } from "@/redux/actions/tasksActions";

interface AddTaskFormProps {
	onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onCancel }) => {
	const [taskData, setTaskData] = useState<Task>({
		id: "",
		title: "",
		body: "",
		dueDate: new Date(),
		userId: 0,
		status: "pending",
		creationDate: new Date(),
		prev: "",
	});

	const [calendarDate, setCalendarDate] = useState(new Date());
	const [showCalendar, setShowCalendar] = useState(false);

	const handleCalendarChange = (selectedDate: Date) => {
		setCalendarDate(selectedDate);
	}
	const handleCalendarClose = (state: boolean) => {
		setShowCalendar(state);
	}

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTaskData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleCancelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onCancel();
	}

	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createTask(taskData));
		onCancel();
	};


	return (
		<>
			<form
				id="add-task-form"
				onSubmit={handleSubmit}
				className="mt-8 max-w-80 block">
				<p className="text-sm font-semibold">New Task</p>

				<input
					id="task-title"
					name="title"
					onChange={handleFieldChange}
					className="mt-4 px-3 py-2.5 text-sm w-full rounded-lg bg-gray-700 focus:outline-1 focus:outline-offset-0 focus:outline-white"
					placeholder="Enter task title" />
				<textarea
					id="task-description"
					name="body"
					onChange={handleFieldChange}
					className="mt-3 mb-1.5 px-3 py-2.5 text-sm w-full rounded-lg bg-gray-700 focus:outline-1 focus:outline-offset-0 focus:outline-white"
					placeholder="Enter task description"/>
				<Datepicker
					options={calendarOptions}
					onChange={handleCalendarChange}
					show={showCalendar}
					setShow={handleCalendarClose}
					value={calendarDate} />
				<StatusField />
				
				<div className="mt-4 flex justify-between">
					<button
						id="add-new-task"
						className="p-2 text-sm bg-cyan-700 rounded-md font-bold hover:bg-cyan-900">
						Add Task
					</button>
					<button
						onClick={handleCancelTask}
						id="cancel-new-task"
						className="p-2 text-sm bg-red-700 rounded-md font-bold hover:bg-red-900">
						Cancel
					</button>
				</div>

			</form>
		</>
	)
}

export default AddTaskForm

const calendarOptions = {
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "short",
		year: "numeric"
	}
}