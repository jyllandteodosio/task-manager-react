import ListsComponent from "@/components/List/ListsComponent";

export default function Dashboard() {
	return (
		<>
			<div className="justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
				<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
					<div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-600">
						<ul className="space-y-2 font-medium">
							<li>
								<a href="#" className="flex items-center p-2 pb-3 text-lg text-zinc-900 rounded-sm dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
									<span className="ms-3">Dashboard</span>
								</a>
							</li>
							<li>
								<a href="#" className="flex items-center p-2 text-sm text-zinc-900 rounded-sm dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
									<span className="flex-1 ms-3 whitespace-nowrap">My Lists</span>
								</a>
							</li>
							<li>
								<a href="#" className="flex items-center p-2 text-sm text-zinc-900 rounded-sm dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
									<span className="flex-1 ms-3 whitespace-nowrap">Shared Lists</span>
									{/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
								</a>
							</li>
							<li>
								<a href="#" className="flex items-center p-2 text-sm text-zinc-900 rounded-sm dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
									<span className="flex-1 ms-3 whitespace-nowrap">Account</span>
								</a>
							</li>
							<li>
								<a href="#" className="flex items-center p-2 text-sm text-zinc-900 rounded-sm dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
									<span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
								</a>
							</li>
						</ul>
					</div>
				</aside>

				<main className="sm:ml-64 h-screen bg-zinc-900">
					<ListsComponent />
				</main>
			</div>
		</>
	);
}
