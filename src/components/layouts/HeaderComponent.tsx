const HeaderComponent = () => {
  return (
    <header id="header-component" className="bg-black font-[family-name:var(--font-geist-sans)] ">
      <nav className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8" aria-label="Global">
        {/* <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">TASKARU</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=blue&shade=600" alt="" />
          </a>
        </div> */}
        <div className="lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-white">TASKARU</a>
        </div>
        {/* <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></a>
        </div> */}
      </nav>
    </header>
  )
}

export default HeaderComponent