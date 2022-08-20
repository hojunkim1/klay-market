import Caver from "caver-js";
import { ACCESS_KEY_ID, CHAIN_ID, SECRET_KEY_ID } from "../../constants";

const CYPRESS_NODE_API = "https://public-node-api.klaytnapi.com/v1/cypress";

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
  new Caver.providers.HttpProvider(CYPRESS_NODE_API, option)
);

export default caver;
