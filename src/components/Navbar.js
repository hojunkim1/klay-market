import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="text-blue-500">
          <Link to="/">Home</Link>
        </li>
        <li className="text-blue-500">
          <Link to="account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
