import { HeaderComponent } from "@/components/layoutComponents/HeaderComponent";
import ListWrapper from "@/components/taskComponents/ListWrapper";

export default function Home() {
  return (
    <>
    <HeaderComponent />
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ListWrapper />
      </main>
    </div>
    </>
  );
}
