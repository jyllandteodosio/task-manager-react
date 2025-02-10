const Status = ({ status } : { status: string }) => {
	return (
		<>
			<span className="rounded-md bg-yellow-600 py-1 px-2 shadow-lg text-xs font-bold uppercase">
				{status}
			</span>
		</>
	)
}

export default Status