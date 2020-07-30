import React, {useCallback} from "react";
import Button from "@material-ui/core/Button";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const PurchaseArticle = (props) => {
    const {id, articleOnChain} = props;
    const {useCacheSend} = drizzleReactHooks.useDrizzle()

    const {defaultAccount} = drizzleReactHooks.useDrizzleState(drizzleState => ({
        defaultAccount: drizzleState.accounts[0]
    }))

    const {send} = useCacheSend(
        'NewsPayPer',
        'purchaseArticle'
    );

    const articleCost = articleOnChain[1];

    const payload = {
        "from": defaultAccount,
        "value": articleCost
    }

    return (
        <div>
            <p>Article cost is {articleCost}
                <Button
                    variant="contained"
                    color="primary"
                    type={"submit"}
                    onClick={
                        useCallback(() => send(id, payload), [id, payload])
                    }
                >
                    Primary
                </Button>
            </p>
        </div>
    )
}

export default PurchaseArticle