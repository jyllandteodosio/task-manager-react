import HeaderComponent from "@/components/layouts/HeaderComponent";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
	return (
		<>
			<HeaderComponent />
			<div className="grid grid-rows-[20px_1fr_20px] justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
					<LoginForm />
				</main>
			</div>
		</>
	);
}
