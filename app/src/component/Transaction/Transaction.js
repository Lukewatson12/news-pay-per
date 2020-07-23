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
export default Transaction;