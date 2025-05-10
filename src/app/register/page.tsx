'use client';

import NavigationBar from "@/components/layouts/NavigationBar";
import RegisterForm from "@/components/Auth/RegisterForm";
import { GoogleReCaptchaProvider } from "@google-recaptcha/react";

export default function Register() {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<NavigationBar />
				<div className="flex justify-center items-start p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
					<main className="flex flex-col gap-8 col-start-2 items-center sm:items-start w-full max-w-lg">
						<GoogleReCaptchaProvider
							type="v3"
							siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
						>
							<RegisterForm />
						</GoogleReCaptchaProvider>
					</main>
				</div>
			</div>
		</>
	);
}
