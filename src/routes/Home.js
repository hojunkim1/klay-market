import { useState } from "react";

const Home = ({ balance, nfts }) => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("MARKET"); // market, wallet, mint
  const [mintImgUrl, setmintImgUrl] = useState("");

  const onSubmitMint = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };

  // const onClickMyCard = () => {};

  // const onClickMarketCard = () => {};

  return (
    <>
      <h1>Home</h1>
      <h3>My Balance: {balance} KLAY</h3>
      {/* 탭 */}
      <nav>
        <ul>
          <li onClick={() => setTab("MARKET")}>Market</li>
          <li onClick={() => setTab("WALLET")}>Wallet</li>
          <li onClick={() => setTab("MINT")}>Mint</li>
        </ul>
      </nav>
      {/* 갤러리 */}
      {tab === "MARKET" || tab === "WALLET" ? (
        <div>
          <ul>
            {nfts.map((nft, index) => (
              <li key={index}>
                <img alt={`My nft: ${index}`} src={nft["uri"]} width="200px" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {/* 발행 페이지 */}
      {tab === "MINT" ? (
        <div>
          <form onSubmit={() => onSubmitMint()}>
            <input
              type="text"
              placeholder="image url"
              value={mintImgUrl}
              onChange={(e) => setmintImgUrl(e.target.value)}
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
