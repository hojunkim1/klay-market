import { useState } from "react";
import caver, { countContract } from "../api/UseCaver";
import { PRIVATE_KEY } from "../constants";

const Home = ({ balance, count, setCount }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);

  const setCountKlay = async (newCount) => {
    try {
      const deployer = caver.wallet.keyring.createFromPrivateKey(PRIVATE_KEY);
      caver.wallet.add(deployer);
      const receipt = await countContract.methods.store(newCount).send({
        from: deployer.address,
        gas: "3000000",
      });
      console.log(receipt);
    } catch (error) {
      console.error(error);
      return;
    }
    setCount(newCount);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setCountKlay(number);
    setLoading(false);
  };

  return (
    <>
      <h1>Home</h1>
      <h2>Test Caver.js</h2>
      <h3>My Balance: {balance} KLAY</h3>
      <h3>Count: {count}</h3>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
        <button>setCount</button>
        {loading ? <small>Loading...</small> : null}
      </form>
    </>
  );
};

export default Home;
