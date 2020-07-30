const Web3 = require("web3");
const NewsPayPer = require("../contracts/NewsPayPer.json")
const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
);

const express = require('express');
const router = express.Router();

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const coursesContract = new web3.eth.Contract(NewsPayPer.abi, "0xCF2b4642b9601c77B7C83a7BC73670d36d97D394");

    getHasArticle()
        .then(hasArticle => res.status(200).json({
            "description": getArticleContent(hasArticle)
        }))

    function getArticleContent(hasArticle) {
        if (hasArticle) {
            return (
                "            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed consectetur erat, id cursus eros.\n" +
                "                Morbi ac tortor est. Nullam sit amet ex et ipsum sollicitudin molestie in sed ante. Fusce ac quam risus.\n" +
                "                Phasellus volutpat lectus velit, at malesuada augue imperdiet sit amet. Interdum et malesuada fames ac\n" +
                "                ante ipsum primis in faucibus. Mauris ut diam sit amet odio tincidunt maximus. Integer in nisi a lectus\n" +
                "                rhoncus commodo. Vestibulum sed mauris eu nulla scelerisque molestie. Phasellus efficitur, ligula\n" +
                "                gravida imperdiet faucibus, elit massa interdum tortor, non sodales tellus mi et tellus. Nulla dapibus\n" +
                "                rhoncus odio, vel fermentum purus mollis vel. Mauris viverra porttitor condimentum. Praesent\n" +
                "                pellentesque dui dolor, at pharetra metus tempor nec.\n" +
                "            \n" +
                "            Aliquam erat volutpat. Phasellus venenatis molestie erat, ut feugiat nunc tincidunt vel. Suspendisse ut\n" +
                "                euismod leo. Nam nec condimentum libero, sit amet consectetur risus. Maecenas ac enim rhoncus, maximus\n" +
                "                tortor id, rutrum neque. Nulla facilisi. Aliquam porttitor ex dolor, a elementum nibh lacinia ut. Duis\n" +
                "                luctus, velit non gravida convallis, leo massa luctus urna, nec posuere nisl nisl ac erat. In placerat\n" +
                "                convallis leo, eget cursus diam elementum at. Quisque mauris sapien, feugiat non lorem vel, bibendum\n" +
                "                malesuada dolor. Nullam rhoncus purus vel ante dapibus, id gravida dolor dignissim. Etiam laoreet sed\n" +
                "                ipsum a egestas.\n" +
                "            "
            );
        }

        return "Cannot view article";
    }

    function getHasArticle() {
        return web3.eth.getAccounts()
            .then(accounts => accounts[0])
            .then(
                defaultAccount =>
                    coursesContract.methods.hasArticle(id).call({
                        "from": defaultAccount
                    })
            ).catch((error) => {
                console.log(error)
            })
    }

});

module.exports = router;
