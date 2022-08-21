import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { getNfts } from "../api/caver/nft";
import { getKlipQrcode, getRequestKey, getResult } from "../api/klip";
import Button from "../components/Button";
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
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [tab, setTab] = useState(MARKET); // market, wallet, mint
  // State
  const [mintImgUrl, setMintImgUrl] = useState("");
  const [statusCode, setStatusCode] = useState(404);

  const onSubmitMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (myAddress !== DEFAULT_ADDRESS) {
      const randomTokenId = Math.floor(Math.random() * 1000000);
      try {
        const reqKey = await getRequestKey.mint(
          myAddress,
          randomTokenId,
          mintImgUrl
        );
        if (reqKey) {
          setQrvalue(getKlipQrcode(reqKey));
          getResult(reqKey, (result) => {
            if (result) {
              console.log(result);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please login");
    }
    setLoading(false);
  };

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
    if (localAddress !== DEFAULT_ADDRESS) {
      setMyAddress(localAddress);
      setMyBalance(localStorage.getItem("balance"));
    }
  }, []);

  useEffect(() => {
    getNfts(MARKET_CONTRACT_ADDRESS).then((n) => setMarketNfts(n));
  }, []);

  useEffect(() => {
    if (myAddress !== DEFAULT_ADDRESS) {
      getNfts(myAddress).then((n) => setMyNfts(n));
    }
  }, [myAddress]);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Home</h1>
      {/* 탭 바 */}
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
      {/* 마켓 갤러리 */}
      {tab === MARKET ? (
        <div>
          <ul>
            {marketNfts.map((nft, index) => (
              <li key={index}>
                <img alt={`Nft: ${index}`} src={nft["uri"]} width="200px" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {/* 내 nft */}
      {tab === WALLET && myAddress !== DEFAULT_ADDRESS ? (
        <>
          <h3 className="mb-10">My Balance: {myBalance} KLAY</h3>
          <div>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10">
              {myNfts.map((nft, index) => (
                <li
                  key={index}
                  className="w-full max-w-md h-80 p-5 rounded-md shadow-lg bg-blue-100
                              flex flex-col justify-between items-center"
                >
                  <div className="h-full mb-5 flex items-center">
                    <img
                      alt={`My nft: ${index}`}
                      src={nft["uri"]}
                      className="max-h-56"
                    />
                  </div>
                  <span
                    className="w-full py-2 rounded-md shadow-md font-bold bg-blue-200
                              flex justify-center"
                  >
                    My NFT
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      {/* 발행 페이지 */}
      {tab === MINT && myAddress !== DEFAULT_ADDRESS ? (
        <div>
          {!(qrvalue === "DEFAULT") ? <QRCodeSVG value={qrvalue} /> : null}
          {statusCode >= 400 ? (
            <span>Image not found.</span>
          ) : (
            <img src={mintImgUrl} alt="preview" className="h-48 rounded-md" />
          )}
          <form onSubmit={onSubmitMint} className="mt-10 flex">
            <input
              type="text"
              placeholder="image url"
              onChange={onChangeCheckValid}
              className="p-4 mr-2 border-solid border-2 rounded-sm border-blue-200"
            />
            <Button text="mint" />
            {loading ? <small>Loading...</small> : null}
          </form>
        </div>
      ) : null}
      {/* 모달 */}
    </>
  );
};

export default Home;
