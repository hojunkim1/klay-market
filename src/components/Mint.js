import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import klipAPI from "../api/klip";
import Button from "./Button";

const DEFAULT_ADDRESS = "0x00";
const DEFAULT_QRCODE = "DEFAULT";

const Mint = ({ myAddress }) => {
  // Utils
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QRCODE);
  // State
  const [mintImgUrl, setMintImgUrl] = useState("");
  const [statusCode, setStatusCode] = useState(404);

  const onSubmitMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (myAddress !== DEFAULT_ADDRESS) {
      const randomTokenId = Math.floor(Math.random() * 1000000);
      try {
        const reqKey = await klipAPI.getRequestKey.mint(
          myAddress,
          randomTokenId,
          mintImgUrl
        );
        if (reqKey) {
          setQrvalue(klipAPI.getResult.qrcode(reqKey));
          klipAPI.getResult.result(reqKey, (result) => {
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

  return (
    <div>
      {qrvalue !== DEFAULT_QRCODE ? <QRCodeSVG value={qrvalue} /> : null}
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
          className="p-4 mr-2 border-solid border-2 rounded-sm text-black border-blue-200"
        />
        <Button text="mint" />
        {loading ? <small>Loading...</small> : null}
      </form>
    </div>
  );
};

export default Mint;
