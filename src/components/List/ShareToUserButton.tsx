'use client'

const ShareToUserButton = () => {
	return (
		<button id="shareToUser" className="min-w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	)
}

export default ShareToUserButton