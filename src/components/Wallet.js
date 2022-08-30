import { useState } from "react";
import klipAPI from "../api/klip";
import Card from "./Card";

const DEFAULT_QRCODE = "DEFAULT";

const Wallet = ({ myAddress, myBalance, myNfts }) => {
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QRCODE);
  const [tokenId, setTokenId] = useState(0);
  const [selected, setSelected] = useState(0);

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
            <div
              key={index}
              onClick={() => {
                setSelected(index);
              }}
            >
              <Card
                nft={nft}
                index={index}
                qrvalue={qrvalue}
                loading={loading}
                selected={selected}
                onClickCard={async () => {
                  setTokenId(nft.id);
                  await onClickSell();
                }}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Wallet;
