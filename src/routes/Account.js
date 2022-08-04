import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { getKlipAddress, getKlipQrcode, getRequestKey } from "../api/UseKlip";

const Account = () => {
  const [qrvalue, setQrvalue] = useState("DEFAULT");

  const onClick = async (e) => {
    e.preventDefault();
    const reqKey = await getRequestKey();
    setQrvalue(getKlipQrcode(reqKey));
    await getKlipAddress(reqKey);
  };

  return (
    <>
      <h1>Account</h1>
      <QRCodeSVG value={qrvalue} />
      <form>
        <button onClick={onClick}>Get Address</button>
      </form>
    </>
  );
};

export default Account;
