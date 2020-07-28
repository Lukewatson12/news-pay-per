import Web3 from "web3";
import NewsPayPer from "../../build/contracts/NewsPayPer.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [NewsPayPer],
};

export default options;
