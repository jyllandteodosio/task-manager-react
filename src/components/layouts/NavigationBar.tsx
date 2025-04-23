import TaskaruIcon from "@/assets/icons/taskaru_icon.png"
import Image from "next/image";

const NavigationBar = () => {
  return (
    <nav className="bg-white shadow-sm font-[family-name:var(--font-geist-sans)]">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image src={TaskaruIcon} alt="Taskaru" priority={true} className="w-12 h-12" />
            </div>
            <h1 className="uppercase font-bold ml-2 text-lg">Taskaru</h1>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar;