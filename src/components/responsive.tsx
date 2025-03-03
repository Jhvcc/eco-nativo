

export function Responsive() {
  return (
    <div className="fixed left-15 bottom-2 bg-slate-800 text-white rounded-full w-10 h-10 flex justify-center items-center pointer-events-none cursor-pointer">
      <p className="block sm:hidden">xs</p>
      <p className="hidden md:hidden sm:block">sm</p>
      <p className="hidden md:block lg:hidden">md</p>
      <p className="hidden lg:block xl:hidden">lg</p>
      <p className="hidden xl:block 2xl:hidden">xl</p>
      <p className="hidden 2xl:block">2xl</p>
    </div>
  )
}