import HeaderComponent from "@/components/layouts/NavigationBar";
import RegisterForm from "@/components/Auth/RegisterForm";

export default function Register() {
	return (
		<>
			<HeaderComponent />
			<div className="grid grid-cols-3 justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-8 col-start-2 items-center sm:items-start">
					<RegisterForm />
				</main>
			</div>
		</>
	);
}
