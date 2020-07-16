const NewsPayPer = artifacts.require("NewsPayPer");

contract("NewsPayPer", accounts => {

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
            999,
            {from: accounts[0]}
        );

        const article = await newsPayPerInstance.getArticle.call(1);

        assert.equal(
            article[0],
            articleDescription,
            "Description does not match"
        );

        // This is a very unusual test
        assert.equal(
            article[1].words[0],
            999,
            "Unable to find the price for the article"
        );
    });

    it("It should store multiple articles and return a list when queried", async () => {
        // const newsPayPerInstance = await NewsPayPer.deployed();
        let articleDescription = "This is my article name";

        await newsPayPerInstance.addArticle(
            articleDescription,
            999,
            {from: accounts[0]}
        );

        await newsPayPerInstance.addArticle(
            articleDescription,
            100,
            {from: accounts[0]}
        );

        await newsPayPerInstance.addArticle(
            articleDescription,
            123,
            {from: accounts[0]}
        );

        const articles = await newsPayPerInstance.getArticles.call();

        assert.equal(
            articles.length,
            3,
            "Total number of articles does not match total saved"
        );
    });
});