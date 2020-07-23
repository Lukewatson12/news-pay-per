import React, {Component} from "react";


class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transaction: props.id,
            hash: props.hash
        }
    }

    render() {
        return (
            <div>
                `Transaction status: ${this.state.hash && this.state.transaction.status}`
            </div>
        );
    }
}

export default Transaction;