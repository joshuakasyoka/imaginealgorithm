import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-white/80 backdrop-blur-sm z-10 pl-0">
      <div className="max-w-7xl mx-auto p-8">
        <Link href="/" className="text-[#7EE66B] hover:text-[#6CD559]">
          ← Return
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;