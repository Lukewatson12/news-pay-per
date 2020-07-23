import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

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
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <h3>Write a new article</h3>
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            label="Description"
                            onChange={event => this.changeDescription(event.target.value)}
                            value={this.state.article.description}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            label="Price"
                            type="number"
                            onChange={event => this.changePrice(event.target.value)}
                            value={this.state.article.price}
                            fullWidth={true}
                        />
                    </Grid>
                    <hr/>
                    <Grid item lg={12}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            Add article
                        </Button>
                    </Grid>
                </Grid>
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