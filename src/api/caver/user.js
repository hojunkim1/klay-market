import caver from "./init";

const user = {
  balance: async (address) => {
    const res = await caver.rpc.klay.getBalance(address);
    return caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
  },
};

export default user;
