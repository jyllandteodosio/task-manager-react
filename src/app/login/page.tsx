import NavigationBar from "@/components/layouts/NavigationBar";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
	return (
		<>
			<NavigationBar />
			<div className="grid grid-cols-3 justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-8 col-start-2 items-center sm:items-start">
					<LoginForm />
				</main>
			</div>
		</>
	);
}
