import caver from ".";

export const getBalance = async (address) => {
  const res = await caver.rpc.klay.getBalance(address);
  return caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
};
