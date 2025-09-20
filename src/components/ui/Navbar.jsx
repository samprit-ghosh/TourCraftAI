import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBgClasses = isScrolled
    ? "bg-white/40 backdrop-blur-md shadow-md text-orange-600"
    : "bg-gray-200 text-orange-600";

  const links = [
    { href: "/", label: "Home" },
    { href: "/ai-destination-recommender", label: "AI Recommendation" },
    { href: "/tour-package-discovery", label: "Tour Discovery" },
    { href: "/tour-package-details", label: "Package details" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${navBgClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
       <h1 className=" text-2xl font-extrabold leading-tight drop-shadow-lg">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-purple-600">
    TourCraft AI
  </span>
</h1>


        {/* Desktop links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-yellow-500 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
        >
          {/* simple animated icon */}
          <div className="relative w-6 h-6">
            <span
              className={`absolute left-0 top-0 w-6 h-[2px] bg-current transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 w-6 h-[2px] bg-current transform transition duration-300 ${
                menuOpen ? "opacity-0" : "-translate-y-1/2"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-6 h-[2px] bg-current transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-white/95 backdrop-blur-md">
          <ul className="flex flex-col space-y-3 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-yellow-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
