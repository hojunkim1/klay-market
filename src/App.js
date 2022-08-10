import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import caver, { countContract } from "./api/UseCaver";
import Layout from "./components/Layout";
import { ADDRESS } from "./constants";
import Account from "./routes/Account";
import Home from "./routes/Home";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getBalance = async (address) => {
      const res = await caver.rpc.klay.getBalance(address);
      return caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
    };
    getBalance(ADDRESS).then((b) => setBalance(b));
  }, [count]);

  useEffect(() => {
    const getCount = async () => await countContract.methods.retrieve().call();
    getCount().then((c) => setCount(c));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Home balance={balance} count={count} setCount={setCount} />
            }
          />
          <Route
            path="/account"
            element={
              <Account balance={balance} count={count} setCount={setCount} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
