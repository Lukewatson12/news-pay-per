const Web3 = require("web3");
const NewsPayPer = require("../../build/contracts/NewsPayPer.json")

const express = require('express');
const router = express.Router();

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

/* GET users listing. */
router.get('/', function (req, res, next) {
    // let contract = new AbiItem();

    let CoursesContract = new web3.eth.Contract(NewsPayPer.abi);
console.log(CoursesContract)

    res.send('respond with a resource');
});

module.exports = router;
