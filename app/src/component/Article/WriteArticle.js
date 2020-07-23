import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
        );
    };

    render() {
        return this.renderPublishArticle();
    }

    renderPublishArticle() {
        return (
            <form onSubmit={event => this.pushArticle(event)}>
                <TextField
                    label="description"
                    onChange={event => this.changeDescription(event.target.value)}
                    value={this.state.article.description}

                />
                <TextField
                    label="Price"
                    type="number"
                    onChange={event => this.changePrice(event.target.value)}
                    value={this.state.article.price}
                />

                <Button type="submit" variant="contained" color="primary">
                    Add article
                </Button>
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