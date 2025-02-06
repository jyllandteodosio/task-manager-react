const StatusField = () => {
	return (
		<>
			<select defaultValue={1} id="task-status" className="mt-3 py-2.5 ps-2 pe-2.5 text-sm w-full rounded-lg bg-gray-700 focus:outline-1 focus:outline-offset-0 focus:outline-white">
				<option key={1}>Pending</option>
				<option>In Progress</option>
				<option>Completed</option>
				<option>Cancelled</option>
			</select>
		</>
	)
}

export default StatusField