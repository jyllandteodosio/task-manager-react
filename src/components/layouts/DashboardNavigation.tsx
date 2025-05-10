
import { useState } from "react";
import TaskaruIcon from "@/assets/icons/taskaru_icon.png"
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import LogoutForm from "../Auth/LogoutForm";

const DashboardNavigation = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<nav className="bg-[#F9F9F9] shadow-sm h-full px-4 py-2">
			<div className="flex items-center mb-10">
				<div className="shrink-0">
					<Image src={TaskaruIcon} alt="Taskaru" priority={true} className="w-12 h-12" />
				</div>
				<h1 className="uppercase font-bold ml-2 text-xl">Taskaru</h1>
			</div>
			<div className="">
				<ul>
					<li className="mb-10 ml-4">
						<Link className="flex hover:text-indigo-600 transition-discrete" href="/dashboard" >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
							</svg>
							<span className="ml-4">Dashboard</span>
						</Link>
					</li>
					{/* <li className="mb-10 ml-4">
						<Link className="flex hover:text-indigo-600 transition-discrete" href="/login" >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
							</svg>
							<span className="ml-4">Notifications</span>
						</Link>
					</li> */}
					<li className="mb-10 ml-4">
						<Link className="flex hover:text-indigo-600 transition-discrete" href="/account" >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>
							<span className="ml-4">Account</span>
						</Link>
					</li>
					<li className="mb-10 ml-4">
						<button
							className="flex hover:text-indigo-600 transition-discrete items-center"
							onClick={openModal} >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
							</svg>
							<span className="ml-4">Sign Out</span>
						</button>

						<Modal isOpen={isModalOpen} onClose={closeModal}>
							<LogoutForm closeModal={closeModal} />
						</Modal>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default DashboardNavigation;