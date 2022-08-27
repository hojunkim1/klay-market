import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import caverAPI from "../api/caver";
import klipAPI from "../api/klip";
import Button from "../components/Button";

const DEFAULT_ADDRESS = "0x00";
const DEFAULT_QRCODE = "DEFAULT";

const Account = () => {
  // User data
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [myBalance, setMyBalance] = useState(0);
  // Utils
  const [loading, setLoading] = useState(false);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QRCODE);

  const onSubmitGetAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reqKey = await klipAPI.getRequestKey.auth();
      setQrvalue(klipAPI.getResult.qrcode(reqKey));
      klipAPI.getResult.result(reqKey, (result) => {
        if (result) {
          setMyAddress(result["klaytn_address"]);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onSubmitLogout = () => {
    localStorage.setItem("address", "0x00");
    localStorage.setItem("balance", 0);
  };

  useEffect(() => {
    const localAddress = localStorage.getItem("address");
    if (localAddress !== DEFAULT_ADDRESS) {
      setMyAddress(localAddress);
      setMyBalance(localStorage.getItem("balance"));
    }
  }, []);

  useEffect(() => {
    if (myAddress !== DEFAULT_ADDRESS) {
      caverAPI.user.balance(myAddress).then((b) => {
        setMyBalance(Math.round(b * 1000) / 1000);
      });
    }
  }, [myAddress]);

  useEffect(() => {
    if (myAddress !== DEFAULT_ADDRESS) {
      localStorage.setItem("address", myAddress);
      localStorage.setItem("balance", myBalance);
    }
  }, [myAddress, myBalance]);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Account</h1>
      {qrvalue !== DEFAULT_QRCODE ? <QRCodeSVG value={qrvalue} /> : null}
      <h3>My Address: {myAddress === DEFAULT_ADDRESS ? "None" : myAddress}</h3>
      <h3>My Balance: {myBalance} KLAY</h3>
      {myAddress === DEFAULT_ADDRESS ? (
        <form onSubmit={onSubmitGetAddress} className="mt-10">
          <Button text="Get Address" />
          {loading ? <small>Loading...</small> : null}
        </form>
      ) : (
        <form onSubmit={onSubmitLogout} className="mt-10">
          <Button text="Logout" />
        </form>
      )}
    </>
  );
};

export default Account;
