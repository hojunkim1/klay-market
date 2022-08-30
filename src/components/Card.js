import { QRCodeSVG } from "qrcode.react";

const DEFAULT_QRCODE = "DEFAULT";

const Card = ({ nft, index, qrvalue, loading, selected, onClickCard }) => {
  return (
    <li
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
        onClick={onClickCard}
        className="w-full py-2 rounded-md shadow-md font-bold bg-pink-600
        flex justify-center"
      >
        {loading && index === selected ? "Loading..." : "Sell"}
      </span>
    </li>
  );
};

export default Card;
