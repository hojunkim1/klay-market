import { useState } from "react";

const Home = ({ balance, count, setCount }) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setCount(number);
    setLoading(false);
  };

  return (
    <>
      <h1>Home</h1>
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
