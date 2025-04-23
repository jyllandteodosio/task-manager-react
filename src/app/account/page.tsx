import DashboardHeader from "@/components/layouts/DashboardHeader";

export default function Account() {
	return (
		<>
			<DashboardHeader />
			<div className="justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
				<main className="h-screen bg-zinc-900 flex">
					Account Page
				</main>
			</div>
		</>
	);
}
