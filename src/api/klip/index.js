import axios from "axios";
import { TOKEN_ABI } from "../../abi";
import { NFT_CONTRACT_ADDRESS } from "../../constants";

// Constants
const APP_NAME = "KLAY MARKET";
const A2A_API_PREPARE = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const A2A_API_QRCODE = "https://klipwallet.com/?target=/a2a?request_key=";
const A2A_API_RESULT =
  "https://a2a-api.klipwallet.com/v2/a2a/result?request_key=";

// getRequestKey returns request key by key type.
const getRequestKey = async (keyType, transaction) => {
  try {
    const res = await axios.post(A2A_API_PREPARE, {
      bapp: { name: APP_NAME },
      type: keyType,
      ...transaction,
    });
    const { request_key } = res.data;
    return request_key;
  } catch (error) {
    console.error(error);
  }
};

// reqAuth returns request key for get user's account.
export const reqAuthKey = async () => {
  const config = {};
  const key = await getRequestKey("auth", config);
  return key;
};

export const reqMintKey = async (to, tokenId, tokenURI) => {
  const config = {
    transaction: {
      to: NFT_CONTRACT_ADDRESS,
      value: "0",
      abi: TOKEN_ABI.find((abi) => abi.name === "mintWithTokenURI"),
      params: `["${to}","${tokenId}","${tokenURI}"]`,
    },
  };
  const key = await getRequestKey("execute_contract", config);
  return key;
};

// getKlipQrcode made qrcode address to use klip app.
export const getKlipQrcode = (requestKey) => `${A2A_API_QRCODE}${requestKey}`;

// watchKlip watch state of klip and get data. you can use data with callback.
export const watchKlip = (requestKey, cb) => {
  const timer = setInterval(async () => {
    try {
      const res = await axios.get(`${A2A_API_RESULT}${requestKey}`);
      if (res.data.result) {
        const { result } = res.data;
        if (cb) {
          cb(result);
        }
        clearInterval(timer);
      }
    } catch (error) {
      console.error(error);
    }
  }, 1000);
};
