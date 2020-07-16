const NewsPayPer = artifacts.require("NewsPayPer");

const oneEther = web3.utils.toWei("1");
const twoEther = web3.utils.toWei("2");

contract("NewsPayPer", accounts => {
    const alice = accounts[0];
    const bob = accounts[1];

    let newsPayPerInstance;

    // Reset the contract each run
    beforeEach(async function () {
        return await NewsPayPer.new()
            .then(function (instance) {
                newsPayPerInstance = instance;
            });
    });

    it("Should allow creation and retrieval of an article", async () => {
        let articleDescription = "This is my article name";

        await newsPayPerInstance.addArticle(
            articleDescription,
            oneEther,
            {from: alice}
        );

        const article = await newsPayPerInstance.getArticle.call(1);
        const {0: description, 1: cost} = article;

        assert.equal(
            description,
            articleDescription,
            "Description does not match"
        );

        assert.equal(
            cost.toString(),
            oneEther,
            "Unable to find the price for the article"
        );
    });

    it("It should store multiple articles and return a list when queried", async () => {
        let articleDescription = "This is my article name";

        await newsPayPerInstance.addArticle(
            articleDescription,
            oneEther,
            {from: alice}
        );

        await newsPayPerInstance.addArticle(
            articleDescription,
            oneEther,
            {from: alice}
        );

        await newsPayPerInstance.addArticle(
            articleDescription,
            twoEther,
            {from: alice}
        );

        const articles = await newsPayPerInstance.getArticles.call();

        assert.equal(
            articles.length,
            3,
            "Total number of articles does not match total saved"
        );
    });

    it("Should allow a wallet to purchase an article", async () => {
        let articleDescription = "This is my article name";

        await newsPayPerInstance.addArticle(
            articleDescription,
            oneEther,
            {from: alice}
        );

        await newsPayPerInstance.purchaseArticle(
            1,
            {
                value: oneEther,
                from: bob
            }
        );

        await newsPayPerInstance.hasArticle(
            1,
            {from: alice}
        ).then(hasArticle => assert.equal(
            false,
            hasArticle,
            "Alice has not purchased the article but owns it"
        ));

        await newsPayPerInstance.hasArticle(
            1,
            {from: bob}
        ).then(hasArticle => assert.ok(
            hasArticle,
            "Bob has purchased the article but does not own it"
        ));
    });
});