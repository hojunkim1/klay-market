import { MARKET_ABI, TOKEN_ABI } from "../../abi";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../../constants";
import prepare from "./prepare";

// Constants
const APP_NAME = "KLAY MARKET";

const getRequestKey = {
  auth: async () => {
    const res = await prepare.auth({ bappName: APP_NAME });
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
  mint: async (myAddress, tokenId, tokenURI) => {
    const res = await prepare.executeContract({
      bappName: APP_NAME,
      to: NFT_CONTRACT_ADDRESS,
      value: "0",
      abi: JSON.stringify(
        TOKEN_ABI.find((abi) => abi["name"] === "mintWithTokenURI")
      ),
      params: `["${myAddress}","${tokenId}","${tokenURI}"]`,
    });
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
  sell: async (myAddress, tokenId) => {
    const res = await prepare.executeContract({
      bappName: APP_NAME,
      to: NFT_CONTRACT_ADDRESS,
      value: "0",
      abi: JSON.stringify(
        TOKEN_ABI.find((abi) => abi["name"] === "safeTransferFrom")
      ),
      params: `["${myAddress}","${MARKET_CONTRACT_ADDRESS}","${tokenId}"]`,
    });
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
  buy: async (tokenId) => {
    const res = await prepare.executeContract({
      bappName: APP_NAME,
      to: MARKET_CONTRACT_ADDRESS,
      value: `${10 * 16}`,
      abi: JSON.stringify(MARKET_ABI.find((abi) => abi["name"] === "buyNFT")),
      params: `["${NFT_CONTRACT_ADDRESS}","${tokenId}"]`,
    });
    if (res.err) {
      console.log(res.err);
    } else {
      return res.request_key;
    }
  },
};

export default getRequestKey;
