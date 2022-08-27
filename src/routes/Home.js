import { useEffect, useState } from "react";
import caverAPI from "../api/caver";
import Market from "../components/Market";
import Mint from "../components/Mint";
import Wallet from "../components/Wallet";
import { MARKET_CONTRACT_ADDRESS } from "../constants";

// Constants
const DEFAULT_ADDRESS = "0x00";
const MARKET = "MARKET",
  WALLET = "WALLET",
  MINT = "MINT";

const Home = () => {
  // User data
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [myBalance, setMyBalance] = useState(0);
  // Nfts
  const [myNfts, setMyNfts] = useState([]);
  const [marketNfts, setMarketNfts] = useState([]);
  // Utils
  const [tab, setTab] = useState(MARKET); // market, wallet, mint

  useEffect(() => {
    const localAddress = localStorage.getItem("address");
    if (localAddress !== DEFAULT_ADDRESS) {
      setMyAddress(localAddress);
      setMyBalance(localStorage.getItem("balance"));
    }
  }, []);

  useEffect(() => {
    caverAPI.nft.getAll(MARKET_CONTRACT_ADDRESS).then((n) => setMarketNfts(n));
  }, []);

  useEffect(() => {
    if (myAddress !== DEFAULT_ADDRESS) {
      caverAPI.nft.getAll(myAddress).then((n) => setMyNfts(n));
    }
  }, [myAddress]);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Home</h1>
      {/* Tab bar */}
      <nav className="mb-10 flex justify-between">
        {tab === MARKET ? (
          <h3 className="text-lg font-semibold">Market</h3>
        ) : tab === WALLET ? (
          <h3 className="text-lg font-semibold">Wallet</h3>
        ) : tab === MINT ? (
          <h3 className="text-lg font-semibold">Mint</h3>
        ) : null}
        {myAddress !== DEFAULT_ADDRESS ? (
          <ul className="flex">
            <li onClick={() => setTab(MARKET)} className="mr-5">
              Market
            </li>
            <li onClick={() => setTab(WALLET)} className="mr-5">
              Wallet
            </li>
            <li onClick={() => setTab(MINT)}>Mint</li>
          </ul>
        ) : null}
      </nav>
      {/* Conponents */}
      {tab === MARKET ? (
        <Market marketNfts={marketNfts} />
      ) : tab === WALLET && myAddress ? (
        <Wallet myAddress={myAddress} myBalance={myBalance} myNfts={myNfts} />
      ) : tab === MINT && myAddress !== DEFAULT_ADDRESS ? (
        <Mint myAddress={myAddress} />
      ) : null}
    </>
  );
};

export default Home;
