import Caver from "caver-js";
import { COUNT_ABI } from "../abi";
import {
  ACCESS_KEY_ID,
  CHAIN_ID,
  COUNT_CONTRACT_ADDRESS,
  SECRET_KEY_ID,
} from "../constants";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic" +
        Buffer.from(`${ACCESS_KEY_ID}:${SECRET_KEY_ID}`).toString("base64"),
    },
    {
      name: "x-chain-id",
      value: CHAIN_ID,
    },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://public-node-api.klaytnapi.com/v1/baobab",
    option
  )
);

export default caver;

export const countContract = new caver.contract(
  COUNT_ABI,
  COUNT_CONTRACT_ADDRESS
);
