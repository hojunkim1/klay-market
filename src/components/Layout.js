import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl font-blod underline">
          Welcome to Klay Market!
        </h1>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
