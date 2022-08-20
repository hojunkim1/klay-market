import { useEffect, useState } from "react";
import { getNfts } from "../api/caver/nft";
import { MARKET_CONTRACT_ADDRESS } from "../constants";

// Constants
const MARKET = "MARKET",
  WALLET = "WALLET",
  MINT = "MINT";

const Home = () => {
  // User data
  const [myAddress, setMyAddress] = useState("0x00");
  const [myBalance, setMyBalance] = useState(0);
  // Nfts
  const [myNfts, setMyNfts] = useState([]);
  const [marketNfts, setMarketNfts] = useState([]);
  // Utils
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(MARKET); // market, wallet, mint
  // State
  const [mintImgUrl, setMintImgUrl] = useState("");
  const [statusCode, setStatusCode] = useState(404);

  const onSubmitMint = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };

  // const onClickMyCard = () => {};

  // const onClickMarketCard = () => {};

  const onChangeCheckValid = async (e) => {
    const { value } = e.target;
    if (typeof value === "string" && value.trim() !== "") {
      try {
        const response = await fetch(value);
        if (response.status <= 400) {
          setMintImgUrl(value);
        }
        setStatusCode(response.status);
      } catch (error) {
        setStatusCode(404);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const localAddress = localStorage.getItem("address");
    if (localAddress !== "") {
      setMyAddress(localAddress);
      setMyBalance(localStorage.getItem("balance"));
    }
  }, []);

  useEffect(() => {
    getNfts(MARKET_CONTRACT_ADDRESS).then((n) => setMarketNfts(n));
  }, []);

  useEffect(() => {
    if (myAddress !== "0x00") {
      getNfts(myAddress).then((n) => setMyNfts(n));
    }
  }, [myAddress]);

  return (
    <>
      <h1>Home</h1>
      {/* 탭 바 */}
      <nav>
        {tab === MARKET ? (
          <h3>Market</h3>
        ) : tab === WALLET ? (
          <h3>Wallet</h3>
        ) : tab === MINT ? (
          <h3>Mint</h3>
        ) : null}
        {!(myAddress === "0x00") ? (
          <ul>
            <li onClick={() => setTab(MARKET)}>Market</li>
            <li onClick={() => setTab(WALLET)}>Wallet</li>
            <li onClick={() => setTab(MINT)}>Mint</li>
          </ul>
        ) : null}
      </nav>
      {/* 마켓 갤러리 */}
      {tab === MARKET ? (
        <div>
          <ul>
            {marketNfts.map((nft, index) => (
              <li key={index}>
                <img alt={`My nft: ${index}`} src={nft["uri"]} width="200px" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {/* 내 nft */}
      {tab === WALLET && !(myAddress === "0x00") ? (
        <>
          <h3>My Balance: {myBalance} KLAY</h3>
          <div>
            <ul>
              {myNfts.map((nft, index) => (
                <li key={index}>
                  <img
                    alt={`My nft: ${index}`}
                    src={nft["uri"]}
                    width="200px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      {/* 발행 페이지 */}
      {tab === MINT && !(myAddress === "0x00") ? (
        <div>
          {statusCode >= 400 ? (
            <span>Image not found.</span>
          ) : (
            <img src={mintImgUrl} alt="preview" height="300px" />
          )}
          <form onSubmit={() => onSubmitMint()}>
            <input
              type="text"
              placeholder="image url"
              onChange={(e) => onChangeCheckValid(e)}
            />
            <button>mint</button>
            {loading ? <small>Loading...</small> : null}
          </form>
        </div>
      ) : null}
      {/* 모달 */}
    </>
  );
};

export default Home;
