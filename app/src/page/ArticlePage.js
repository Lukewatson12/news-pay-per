import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";

const ArticlePage = (props) => {
    const {articleId} = useParams();
    let {drizzle, drizzleState} = props;

    const [articleKey, setArticleKey] = useState(undefined)
    const [hasArticleKey, setHasArticleKey] = useState(false)

    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const article = store.NewsPayPer.getArticle[articleKey];
    const hasArticle = store.NewsPayPer.hasArticle[hasArticleKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
        setArticleKey(articleKey);
    }, [])

    useEffect(() => {
        let hasArticleKey = newsPayPerContract.methods["hasArticle"].cacheCall(
            articleId,
            {
                "from": drizzleState.accounts[0]
            }
        );
        setHasArticleKey(hasArticleKey);
    }, [])

    const purchaseArticle = useCallback((article) => {
        let purchaseArticleKey = newsPayPerContract.methods["purchaseArticle"].cacheSend(
            articleId,
            {
                "from": drizzleState.accounts[0],
                "value": article.value[1]
            }
        );
    }, []);


    if (undefined === articleKey || undefined === article || undefined === hasArticle) {
        return (
            <div>Loading Article {articleId}</div>
        )
    }
    console.log(hasArticle);
    if (false === hasArticle.value) {
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

    return (
        <div>
            <p>Article purchased</p>
        </div>
    )
}

export default ArticlePage;