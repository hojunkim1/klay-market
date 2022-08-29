// Constants
const SERVER_URL = "https://a2a-api.klipwallet.com/v2/a2a";

const getResult = {
  // watchKlip watch state of klip and get data. you can use data with callback.
  result: async (requestKey, cb) => {
    const timer = setInterval(async () => {
      const res = await (
        await fetch(`${SERVER_URL}/result?request_key=${requestKey}`, {
          method: "GET",
        })
      ).json();
      if (res.result) {
        if (cb) {
          cb(res.result);
        }
        clearInterval(timer);
      } else if (res.error) {
        console.log(res.error);
        clearInterval(timer);
      }
    }, 1000);
  },
  // getKlipQrcode made qrcode address to use klip app.
  qrcode: (requestKey) =>
    `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`,
};

export default getResult;
