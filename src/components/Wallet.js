import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import klipAPI from "../api/klip";

const DEFAULT_QRCODE = "DEFAULT";

const Wallet = ({ myAddress, myBalance, myNfts }) => {
  // Utils
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QRCODE);
  const [selected, setSelected] = useState(0);
  // data
  const [tokenId, setTokenId] = useState(0);

  const onClickSell = async () => {
    setLoading(true);
    try {
      const reqKey = await klipAPI.getRequestKey.sell(myAddress, tokenId);
      if (reqKey) {
        setQrvalue(klipAPI.getResult.qrcode(reqKey));
        klipAPI.getResult.result(reqKey, (result) => {
          if (result) {
            console.log(result);
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3 className="mb-10 text-lg font-bold">My Balance: {myBalance} KLAY</h3>
      <div>
        <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10">
          {myNfts.map((nft, index) => (
            <li
              key={index}
              className="w-full max-w-md h-80 p-5 rounded-md shadow-lg bg-gray-500
              flex flex-col justify-between items-center"
            >
              <div className="h-full mb-5 flex items-center">
                {qrvalue !== DEFAULT_QRCODE && index === selected ? (
                  <QRCodeSVG value={qrvalue} />
                ) : (
                  <img
                    alt={`My nft: ${index}`}
                    src={nft["uri"]}
                    className="max-h-56 rounded-md"
                  />
                )}
              </div>
              <span
                onClick={async (e) => {
                  e.preventDefault();
                  setTokenId(nft.id);
                  setSelected(index);
                  await onClickSell();
                }}
                className="w-full py-2 rounded-md shadow-md font-bold bg-pink-600
                flex justify-center"
              >
                {loading && index === selected ? "Loading..." : "Sell"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Wallet;
