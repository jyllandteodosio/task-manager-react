'use client'

const ListComponent = () => {

	return (
		<li id="list" data-testid="list" className="flex justify-between p-5 mr-8 bg-zinc-700 hover:bg-zinc-600">
			<div className="flex min-w-0">
				<div className="min-w-0 flex-auto">
					<p className="text-sm/6 font-semibold text-white">Leslie Alexander</p>
					<p className="text-sm/6 font-semibold text-white">Leslie Alexander</p>
				</div>
			</div>
		</li>
	)
}

export default ListComponent