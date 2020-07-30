pragma solidity >=0.4.21 <0.7.0;

contract NewsPayPer {
    struct Article {
        uint price;
        string description;
        uint id;
        mapping(address => bool) readers;
    }

    mapping(uint => Article) public articles;

    uint public totalArticles;

    function addArticle(string memory description, uint price) public {
        Article memory article = Article(
            price,
            description,
            totalArticles
        );

        uint articleId = totalArticles += 1;

        articles[articleId] = article;
    }

    function purchaseArticle(uint _id) public payable {
        //Dont buy if doesnt exist
        Article memory article = articles[_id];

        require(articles[_id].readers[msg.sender] == false, "You have already purchased this article");
        require(msg.value >= article.price, "Not enough funds to purchase article");

        articles[_id].readers[msg.sender] = true;

        if (msg.value > article.price) {
            msg.sender.transfer(msg.value - article.price);
        }
    }

    function getBalanceContract() public view returns (uint){
        return address(this).balance;
    }

    function hasArticle(uint _id) public view returns (bool) {
        return articles[_id].readers[msg.sender];
    }

    function getArticle(uint _id) public view returns (string memory, uint) {
        return (articles[_id].description, articles[_id].price);
    }

    //return Array of structure
    function getArticles() public view returns (uint[] memory){
        uint[] memory articlesList = new uint[](totalArticles);

        for (uint i = 0; i < totalArticles; i++) {
            articlesList[i] = i;
        }
        return articlesList;
    }
}
