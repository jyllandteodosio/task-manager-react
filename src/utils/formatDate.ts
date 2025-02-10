export const formatDate = (date: Date) => {
	const newDate = new Date(date);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(newDate);
}