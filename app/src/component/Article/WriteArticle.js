import React, {Component} from "react";

class WriteArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {
                "description": "asdas",
                "price": 2
            }
        }

        this.changeDescription = this.changeDescription.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }

    // renderTransaction() {
    //     const {transactions, transactionStack} = this.props.drizzleState;
    //
    //     const txHash = transactionStack[this.state.transaction.id];
    //
    //     if (null === txHash) {
    //         return (
    //             <div>No transaction found</div>
    //         );
    //     }
    //
    //     return (
    //         <div>
    //             <Transaction
    //                 transaction={transactions[this.state.transaction.id]}
    //                 hash={txHash}
    //                 drizzle={this.props.drizzle}
    //                 drizzleState={this.props.drizzleState}
    //             />
    //         </div>
    //     )
    // }

    pushArticle(event) {
        event.preventDefault();

        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NewsPayPer;

        contract.methods["addArticle"].cacheSend(
            this.state.article.description,
            this.state.article.price,
            {
                from: drizzleState.accounts[0]
            }
        );};

    render() {
        return this.renderPublishArticle();
    }

    renderPublishArticle() {
        return (
            <form onSubmit={event => this.pushArticle(event)}>
                <input
                    onChange={event => this.changeDescription(event.target.value)}
                    value={this.state.article.description}
                />
                <input
                    onChange={event => this.changePrice(event.target.value)}
                    type="number"
                    value={this.state.article.price}
                />
                <input
                    type="submit"
                />
            </form>
        )
    }

    changeDescription(description) {
        let article = {...this.state.article}
        article.description = description;
        this.setState({article})
    }

    changePrice(price) {
        let article = {...this.state.article}
        article.price = price;
        this.setState({article})
    }
}

export default WriteArticle;