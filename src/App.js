import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Account from "./routes/Account";
import Home from "./routes/Home";

const App = () => {
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
