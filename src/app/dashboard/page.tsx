'use client'
import ReduxProvider from "@/components/layouts/ReduxProvider";
import DashboardHeader from "@/components/layouts/DashboardHeader";
import DashboardNavigation from "@/components/layouts/DashboardNavigation";
import ListsSection from "@/components/List/ListsSection";
import ListDetailSection from "@/components/List/ListDetailSection";

const Dashboard = () => {
	return (
		<>
			<div className="grid grid-cols-8 xl:grid-cols-6 h-screen font-[family-name:var(--font-geist-sans)]">
				<div className="xl:col-span-1 lg:col-span-2 lg:block hidden col-span-0">
					<DashboardNavigation />
				</div>
				<main className="xl:col-span-5 lg:col-span-6 col-span-8">
					<DashboardHeader />
					<div className="flex-full my-8 mx-10">
						<div className="grid grid-cols-10">
							<ReduxProvider>
								<ListsSection />
								<ListDetailSection />
							</ReduxProvider>
						</div>
					</div>
				</main >
			</div >
		</>
	);
}

export default Dashboard