import { TOKEN_ABI } from "../../abi";
import { NFT_CONTRACT_ADDRESS } from "../../constants";
import caver from "./init";

const nftContract = new caver.contract(TOKEN_ABI, NFT_CONTRACT_ADDRESS);

const nft = {
  getAll: async (address) => {
    const balance = await nftContract.methods.balanceOf(address).call();
    const tokenIds = [];
    for (let i = 0; i < balance; i++) {
      const id = await nftContract.methods
        .tokenOfOwnerByIndex(address, i)
        .call();
      tokenIds.push(id);
    }
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
  },
};

export default nft;
