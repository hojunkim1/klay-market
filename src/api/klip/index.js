import { TOKEN_ABI } from "../../abi";
import { NFT_CONTRACT_ADDRESS } from "../../constants";
import prepare from "./prepare";

// Constants
const APP_NAME = "KLAY MARKET";
const SERVER_URL = "https://a2a-api.klipwallet.com/v2/a2a";

export const getRequestKey = {
  auth: async () => {
    const res = await prepare.auth(APP_NAME);
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
  mint: async (myAddress, tokenId, tokenURI) => {
    const to = NFT_CONTRACT_ADDRESS,
      value = "0",
      abi = JSON.stringify(
        TOKEN_ABI.find((abi) => abi["name"] === "mintWithTokenURI")
      ),
      params = `["${myAddress}","${tokenId}","${tokenURI}"]`;
    const res = await prepare.executeContract(APP_NAME, to, value, abi, params);
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
};

// getKlipQrcode made qrcode address to use klip app.
export const getKlipQrcode = (requestKey) =>
  `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;

// watchKlip watch state of klip and get data. you can use data with callback.
export const getResult = async (requestKey, cb) => {
  const timer = setInterval(async () => {
    const res = await (
      await fetch(`${SERVER_URL}/result?request_key=${requestKey}`, {
        method: "GET",
      })
    ).json();
    if (res.result) {
      const { result } = res;
      if (cb) {
        cb(result);
      }
      clearInterval(timer);
    }
  }, 1000);
};
