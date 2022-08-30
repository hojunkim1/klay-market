import { useState } from "react";
import klipAPI from "../api/klip";
import Card from "./Card";

const DEFAULT_QRCODE = "DEFAULT";

const Market = ({ marketNfts }) => {
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QRCODE);
  const [tokenId, setTokenId] = useState(0);
  const [selected, setSelected] = useState(0);

  const onClickBuy = async () => {
    setLoading(true);
    try {
      const reqKey = await klipAPI.getRequestKey.buy(tokenId);
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
    <div>
      <ul>
        {marketNfts.map((nft, index) => (
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
                await onClickBuy();
              }}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Market;
