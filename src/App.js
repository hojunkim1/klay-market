import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import caver, { fetchCardsOf } from "./api/UseCaver";
import Layout from "./components/Layout";
import { MARKET_CONTRACT_ADDRESS } from "./constants";
import Account from "./routes/Account";
import Home from "./routes/Home";

// App component basically used for routing with react-router-dom
// Some data, used globally, fetched in App component
const App = () => {
  const [myAddress, setMyAddress] = useState("0x00");
  const [balance, setBalance] = useState(0);
  const [nfts, setNfts] = useState([]);

  const getBalance = async (address) => {
    const res = await caver.rpc.klay.getBalance(address);
    return caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
  };

  const getNfts = async (address) => await fetchCardsOf(address);
  const getMarketNfts = async (address) => await fetchCardsOf(address);

  // fetch balance data with caver.js
  useEffect(() => {
    if (!(myAddress === "0x00")) {
      getBalance(myAddress).then((b) =>
        setBalance(Math.round(b * 1000) / 1000)
      );
    }
  }, [myAddress]);

  // fetch my nfts with caver.js
  useEffect(() => {
    if (!(myAddress === "0x00")) {
      getNfts(myAddress).then((n) => setNfts(n));
    }
  }, [myAddress]);

  // fetch all market nfts with caver.js
  useEffect(() => {
    getMarketNfts(MARKET_CONTRACT_ADDRESS).then((n) => setNfts(n));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home balance={balance} nfts={nfts} />} />
          <Route
            path="/account"
            element={
              <Account
                address={myAddress}
                setAddress={setMyAddress}
                balance={balance}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
