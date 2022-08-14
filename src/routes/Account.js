import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { getKlipQrcode, reqAuthKey, watchKlip } from "../api/UseKlip";

const Account = ({ address, setAddress, balance }) => {
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState("DEFAULT");

  const onSubmitGetAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqKey = await reqAuthKey();
      setQrvalue(getKlipQrcode(reqKey));
      watchKlip(reqKey, (result) => {
        if (result) {
          setAddress(result["klaytn_address"]);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Account</h1>
      {!(qrvalue === "DEFAULT") ? <QRCodeSVG value={qrvalue} /> : null}
      <h3>My Address: {address === "0x00" ? "None" : address}</h3>
      <h3>My Balance: {balance} KLAY</h3>
      <form onSubmit={onSubmitGetAddress}>
        <button>Get Address</button>
        {loading ? <small>Loading...</small> : null}
      </form>
    </>
  );
};

export default Account;
