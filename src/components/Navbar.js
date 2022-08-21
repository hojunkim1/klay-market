import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-5 max-w-screen-lg w-screen">
      <ul className="flex">
        <li className="text-blue-500 mr-5">
          <Link to="/" className="hover:no-underline hover:text-blue-700">
            Home
          </Link>
        </li>
        <li className="text-blue-500">
          <Link to="account" className="hover:no-underline hover:text-blue-700">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
