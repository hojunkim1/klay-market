import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="Detail">Detail</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
