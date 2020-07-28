const Web3 = require("web3");
const NewsPayPer = require("../../build/contracts/NewsPayPer.json")
const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
);

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const coursesContract = new web3.eth.Contract(NewsPayPer.abi, "0xCF2b4642b9601c77B7C83a7BC73670d36d97D394");

    getHasArticle()
        .then(hasArticle => res.send(
            getArticleContent(hasArticle)
        ))

    function getArticleContent(hasArticle) {
        if (hasArticle) {
            return "hello";
        }

        return "No article";
    }

    function getHasArticle() {
        return web3.eth.getAccounts()
            .then(accounts => accounts[0])
            .then(
                defaultAccount =>
                    coursesContract.methods.hasArticle(1).call({
                        "from": defaultAccount
                    })
            )
    }

});

module.exports = router;
