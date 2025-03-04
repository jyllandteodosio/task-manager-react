import HeaderComponent from "@/components/layouts/HeaderComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
        <HeaderComponent />
        <div className="grid grid-rows-[20px_1fr_20px] justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center">
            <p>Welcome to Taskaru</p>
            <p>Click here to <Link className="font-semibold text-indigo-400 hover:text-indigo-300" href="/login">Log In</Link> or <Link className="font-semibold text-indigo-400 hover:text-indigo-300" href="/register">Register</Link></p>
          </main>
        </div>
    </>
  );
}
