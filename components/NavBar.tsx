import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={'/'}>InvoWork</Link>
      <Link className="bg-white p-2" href={'/add-topic'}>Add Topic</Link>
    </nav>
  )
}

export default NavBar
