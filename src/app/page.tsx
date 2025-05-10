import Link from "next/link";
import NavigationBar from "@/components/layouts/NavigationBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow flex justify-center items-center p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center">
          <p>Welcome to Taskaru</p>
          <p>
            Click here to{" "}
            <Link
              className="font-semibold text-indigo-400 hover:text-indigo-300"
              href="/login"
            >
              Log In
            </Link>{" "}
            or{" "}
            <Link
              className="font-semibold text-indigo-400 hover:text-indigo-300"
              href="/register"
            >
              Register
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
