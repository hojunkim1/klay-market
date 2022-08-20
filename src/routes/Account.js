import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { getBalance } from "../api/caver/user";
import { getKlipQrcode, reqAuthKey, watchKlip } from "../api/klip";

const Account = () => {
  const [myAddress, setMyAddress] = useState("0x00");
  const [myBalance, setMyBalance] = useState(0);
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
          setMyAddress(result["klaytn_address"]);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const localAddress = localStorage.getItem("address");
    if (localAddress !== "") {
      setMyAddress(localAddress);
      setMyBalance(localStorage.getItem("balance"));
    }
  }, []);

  useEffect(() => {
    if (myAddress !== "0x00") {
      getBalance(myAddress).then((b) => {
        setMyBalance(Math.round(b * 1000) / 1000);
      });
    }
  }, [myAddress]);

  useEffect(() => {
    if (myAddress !== "0x00") {
      localStorage.setItem("address", myAddress);
      localStorage.setItem("balance", myBalance);
    }
  }, [myAddress, myBalance]);

  return (
    <>
      <h1>Account</h1>
      {!(qrvalue === "DEFAULT") ? <QRCodeSVG value={qrvalue} /> : null}
      <h3>My Address: {myAddress === "0x00" ? "None" : myAddress}</h3>
      <h3>My Balance: {myBalance} KLAY</h3>
      <form onSubmit={onSubmitGetAddress}>
        <button>Get Address</button>
        {loading ? <small>Loading...</small> : null}
      </form>
    </>
  );
};

export default Account;
