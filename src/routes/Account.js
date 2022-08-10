import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { getKlipQrcode, reqAuth, reqSetCount, watchKlip } from "../api/UseKlip";

const Account = ({ balance, count, setCount }) => {
  const [qrvalue, setQrvalue] = useState("DEFAULT");
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState("Get Your Address with Klip!");

  const onClickGetAddress = async (e) => {
    e.preventDefault();
    const reqKey = await reqAuth();
    setQrvalue(getKlipQrcode(reqKey));
    watchKlip(reqKey, (result) => {
      if (result) {
        setAddress(result["klaytn_address"]);
      }
    });
  };

  const onClickSetCount = async (e) => {
    e.preventDefault();
    const reqKey = await reqSetCount(number);
    setQrvalue(getKlipQrcode(reqKey));
    watchKlip(reqKey, (result) => {
      if (result) {
        console.log(result);
        setCount(number);
      }
    });
  };

  return (
    <>
      <h1>Account</h1>
      <h2>Test Klip Api</h2>
      <QRCodeSVG value={qrvalue} />
      <h3>My Balance: {balance} KLAY</h3>
      <h3>Count: {count}</h3>
      <h3>Account Key: {address}</h3>
      <form>
        <button onClick={onClickGetAddress}>Get Address</button>
      </form>
      <form>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
          required
        />
        <button onClick={onClickSetCount}>Set Count</button>
      </form>
    </>
  );
};

export default Account;
