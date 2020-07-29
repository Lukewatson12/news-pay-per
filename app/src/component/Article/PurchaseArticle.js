import React, {useCallback, useEffect} from "react";
import Button from "@material-ui/core/Button";

const PurchaseArticle = (props) => {
    const {drizzle, drizzleState, id, article} = props;
    const newsPayPerContract = drizzle.contracts.NewsPayPer;

    const purchaseArticle = useCallback((article) => {
        newsPayPerContract.methods["purchaseArticle"].cacheSend(
            id,
            {
                "from": drizzleState.accounts[0],
                "value": article.value[1]
            }
        );
    }, [newsPayPerContract, drizzleState, id]);

    return (
        <div>
            <p>Article cost is {article.value[1]}
                <Button
                    variant="contained"
                    color="primary"
                    type={"submit"}
                    onClick={() => purchaseArticle(article)}
                >
                    Primary
                </Button>
            </p>
        </div>
    )
}

export default PurchaseArticle