import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { FaSearch, FaSignOutAlt, FaClipboardList, FaShoppingCart, FaCashRegister } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import userImg from "../assets/user/user.png";

const navigation = [
  { name: "Orders", href: "/orders", icon: <FaClipboardList className="mr-2" /> },
  { name: "Cart Page", href: "/cart", icon: <FaShoppingCart className="mr-2" /> },
  { name: "Check Out", href: "/checkout", icon: <FaCashRegister className="mr-2" /> },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logoutUser();
    setIsDropdownOpen(false);
  };

  const navLinkClass = "text-white hover:text-lime-300 px-3 py-2 rounded-md text-sm font-medium";

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left - Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={logo} alt="DairyPro Logo" className="h-10" />
          </Link>
          <div className="hidden md:flex gap-4">
            <NavLink to="/" className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-800' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-800' : ''}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-800' : ''}`}>Contact</NavLink>
            <NavLink to="/categories" className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-800' : ''}`}>All products</NavLink>
          </div>
        </div>

        {/* Middle - Search */}
        <div className="relative sm:w-64 w-40 hidden sm:block">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-gray-800 text-white w-full py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Right - User & Cart */}
        <div className="relative flex items-center gap-4">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img src={userImg} alt="User Img" className="h-8 w-8 rounded-full border-2 border-lime-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-56 bg-white text-gray-700 shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                        <Link to={item.href} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                          {item.icon} {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" /> LogOut
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-lime-300">
              <HiOutlineUser className="size-6" />
            </Link>
          )}
          <Link
            to="/cart"
            className="flex items-center bg-lime-500 text-white px-3 py-1.5 rounded-md hover:bg-lime-600 transition"
          >
            <HiOutlineShoppingCart className="mr-1" />
            <span className="text-sm font-semibold">{cartItems.length || 0}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
