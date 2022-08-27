import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <header className="w-full mb-10 px-6 bg-gray-700 flex justify-center">
        <Navbar />
      </header>
      <main className="w-full px-6 flex justify-center min-h-screen">
        <div className="max-w-screen-lg w-screen">
          <Outlet />
        </div>
      </main>
      <footer
        className="w-full mt-10 px-6 h-48 bg-gray-700
        flex justify-center items-center"
      >
        <div className="max-w-screen-lg w-screen">
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default Layout;
