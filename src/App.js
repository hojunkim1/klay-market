import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import caver, { countContract } from "./api/UseCaver";
import Layout from "./components/Layout";
import { ADDRESS, PRIVATE_KEY } from "./constants";
import Account from "./routes/Account";
import Home from "./routes/Home";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [count, setCount] = useState(0);

  const setCountKlay = async (newCount) => {
    try {
      const deployer = caver.wallet.keyring.createFromPrivateKey(PRIVATE_KEY);
      caver.wallet.add(deployer);
      const receipt = await countContract.methods.store(newCount).send({
        from: deployer.address,
        gas: "3000000",
      });
      console.log(receipt);
    } catch (error) {
      console.error(error);
      return;
    }
    setCount(newCount);
  };

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
              <Home balance={balance} count={count} setCount={setCountKlay} />
            }
          />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
