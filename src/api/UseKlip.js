import axios from "axios";
import { COUNT_ABI } from "../abi";
import { COUNT_CONTRACT_ADDRESS } from "../constants";

// Constants
const APP_NAME = "Klay Market";
const A2A_API_PREPARE = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const A2A_API_QRCODE = "https://klipwallet.com/?target=/a2a?request_key=";
const A2A_API_RESULT =
  "https://a2a-api.klipwallet.com/v2/a2a/result?request_key=";

// Get request key for create api address
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

export const reqAuth = async () => {
  const config = {};
  const key = await getRequestKey("auth", config);
  return key;
};

export const reqSetCount = async (count) => {
  const config = {
    transaction: {
      to: COUNT_CONTRACT_ADDRESS,
      value: "0",
      abi: JSON.stringify(COUNT_ABI[1]),
      params: `["${count}"]`,
    },
  };
  const key = await getRequestKey("execute_contract", config);
  return key;
};

// Get qrcode address to request klip address
export const getKlipQrcode = (requestKey) => `${A2A_API_QRCODE}${requestKey}`;

// Watch klip
export const watchKlip = (requestKey, cb) => {
  const timer = setInterval(async () => {
    try {
      const res = await axios.get(`${A2A_API_RESULT}${requestKey}`);
      if (res.data.result) {
        const { result } = res.data;
        console.log(result);
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
