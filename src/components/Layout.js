import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <header className="w-full mb-10 px-3 bg-gray-200 flex justify-center">
        <Navbar />
      </header>
      <main className="w-full px-3 flex justify-center min-h-screen">
        <div className="max-w-screen-lg w-screen">
          <Outlet />
        </div>
      </main>
      <footer className="w-full px-3 h-48 bg-gray-200 flex justify-center items-center">
        <div className="max-w-screen-lg w-screen">
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default Layout;
