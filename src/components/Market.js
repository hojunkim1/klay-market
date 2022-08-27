const Market = ({ marketNfts }) => {
  return (
    <div>
      <ul>
        {marketNfts.map((nft, index) => (
          <li key={index}>
            <img alt={`Nft: ${index}`} src={nft["uri"]} width="200px" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
