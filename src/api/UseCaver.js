import Caver from "caver-js";
import { TOKEN_ABI } from "../abi";
import {
  ACCESS_KEY_ID,
  CHAIN_ID,
  NFT_CONTRACT_ADDRESS,
  SECRET_KEY_ID,
} from "../constants";

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

const nftContract = new caver.contract(TOKEN_ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardsOf = async (address) => {
  // Fetch balance
  const balance = await nftContract.methods.balanceOf(address).call();
  // Fetch Token IDs
  const tokenIds = [];
  for (let i = 0; i < balance; i++) {
    const id = await nftContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  // Fetch Token URIs
  const tokenUris = [];
  for (let i = 0; i < balance; i++) {
    const uri = await nftContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  const nfts = [];
  for (let i = 0; i < balance; i++) {
    nfts.push({ uri: tokenUris[i], id: tokenUris[i] });
  }
  return nfts;
};
