import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./routes/Account";
import Home from "./routes/Home";

const App = () => {
  useEffect(() => {
    const localAddress = localStorage.getItem("address");
    const localBalance = localStorage.getItem("balance");
    if (!localAddress) {
      localStorage.setItem("address", "0x00");
    }
    if (!localBalance) {
      localStorage.setItem("balance", 0);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
