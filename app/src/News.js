import React, {Component} from "react";
import Article from "./component/Article/Article";
import WriteArticle from "./component/Article/WriteArticle";

class News extends Component {
    props;

    constructor(props) {
        super(props);
        this.state = {
            dataKeys: {
                getBalanceContract: null,
                getArticles: null
            },
            articles: []
        }
    }

    componentDidMount() {
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NewsPayPer;
        const state = drizzleState.contracts.NewsPayPer;

        if (state.initialized) {
            const getBalanceContractKey = contract.methods["getBalanceContract"].cacheCall();
            const getArticlesKey = contract.methods["getArticles"].cacheCall();

            this.setState({
                "dataKeys": {
                    "getBalanceContract": getBalanceContractKey,
                    "getArticles": getArticlesKey
                }
            });
        }

    }

    pushArticle = article => {
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NewsPayPer;

        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods["addArticle"].cacheSend(
            article,
            12,
            {
                from: drizzleState.accounts[0]
            }
        );

        // save the `stackId` for later reference
        this.setState({stackId});
    };

    getTxStatus = () => {
        // get the transaction states from the drizzle state
        const {transactions, transactionStack} = this.props.drizzleState;

        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[this.state.stackId];

        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;

        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
    };

    // fetchArticle = (id) => {
    //     const {drizzle, drizzleState} = this.props;
    //     const contract = drizzle.contracts.NewsPayPer;
    //     const state = drizzleState.contracts.NewsPayPer;
    //
    //     // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    //     if (state.initialized) {
    //         const stackId = contract.methods.getArticle.cacheCall(id)
    //         const ww = contract.methods.getArticles.cacheCall()
    //         const myString = state.getArticle[stackId];
    //         console.log(stackId);
    //         console.log(state);
    //
    //         // let newArticles = [
    //         //     ...state.articles,
    //         //     {}
    //         // ];
    //         // this.setState({
    //         //     newArticles
    //         // })
    //     }
    //
    // };

    render() {
        const {drizzleState} = this.props;

        const {NewsPayPer} = drizzleState.contracts;

        const articles = NewsPayPer.getArticles[this.state.dataKeys.getArticles];

        if (articles === undefined || articles.value === undefined) {
            return (
                <div>
                    No Articles Found
                    <WriteArticle
                        drizzle={this.props.drizzle}
                        drizzleState={drizzleState}
                    />
                </div>
            )
        }

        return (
            <div>
                {articles.value.map(function (object, i) {
                    return <Article
                        key={i}
                        id={i}
                        drizzle={this.props.drizzle}
                        drizzleState={drizzleState}
                    />;
                }.bind(this))}

                <WriteArticle
                    drizzle={this.props.drizzle}
                    drizzleState={drizzleState}
                />
            </div>
        )
    }
}

export default News;