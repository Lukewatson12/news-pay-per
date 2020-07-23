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