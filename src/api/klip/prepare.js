// Constants
const SERVER_URL = "https://a2a-api.klipwallet.com/v2/a2a";

const prepare = {
  auth: async ({ bappName }) => {
    return await (
      await fetch(`${SERVER_URL}/prepare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bapp: {
            name: bappName,
          },
          type: "auth",
        }),
      })
    ).json();
  },
  executeContract: async ({ bappName, to, value, abi, params }) => {
    return await (
      await fetch(`${SERVER_URL}/prepare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bapp: {
            name: bappName,
          },
          type: "execute_contract",
          transaction: {
            to: to,
            value: value,
            abi: abi,
            params: params,
          },
        }),
      })
    ).json();
  },
};

export default prepare;
