import axios from "axios";

export const getRequestKey = async () => {
  try {
    const res = await axios.post(
      "https://a2a-api.klipwallet.com/v2/a2a/prepare",
      {
        bapp: { name: "My BApp" },
        callback: {
          success: "mybapp://klipwallet/success",
          fail: "mybapp://klipwallet/fail",
        },
        type: "auth",
      }
    );
    const { request_key } = res.data;
    return request_key;
  } catch (error) {
    console.error(error);
  }
};

export const getKlipAddress = async (requestKey) => {
  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${requestKey}`
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  let timerId = setInterval(() => {
    fetchData().then((res) => {
      if (res.data.result) {
        const { result } = res.data;
        clearInterval(timerId);
        console.log(result);
      }
    });
  }, 1000);
};

export const getKlipQrcode = (requestKey) =>
  `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;
