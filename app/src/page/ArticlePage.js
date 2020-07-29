import React, {useCallback, useEffect, useState} from "react";
import {useSelector, shallowEqual} from 'react-redux'
import {useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {getArticle} from "../redux/actions";

const ArticlePage = (props) => {
    console.log("rerender");
    const {articleId} = useParams();
    const {drizzle, drizzleState} = props;
    const [articleKey, setArticleKey] = useState(undefined)
    const [hasArticleKey, setHasArticleKey] = useState(false)
    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const articleOnChain = store.NewsPayPer.getArticle[articleKey];
    const hasArticle = store.NewsPayPer.hasArticle[hasArticleKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
        setArticleKey(articleKey);
    }, [articleId, newsPayPerContract])

    useEffect(() => {
        let hasArticleKey = newsPayPerContract.methods["hasArticle"].cacheCall(
            articleId,
            {
                "from": drizzleState.accounts[0]
            }
        );
        setHasArticleKey(hasArticleKey);
    }, [articleId, newsPayPerContract, drizzleState])

    const purchaseArticle = useCallback((article) => {
        newsPayPerContract.methods["purchaseArticle"].cacheSend(
            articleId,
            {
                "from": drizzleState.accounts[0],
                "value": article.value[1]
            }
        );
    }, [newsPayPerContract, drizzleState, articleId]);

    const article = useSelector(({articles}) => articles[articleId], shallowEqual)

    if (undefined === articleKey || undefined === articleOnChain || undefined === hasArticle) {
        return (
            <div>Loading Article {articleId}</div>
        )
    }

    if (false === hasArticle.value) {
        return (
            <div>
                <p>Article cost is {articleOnChain.value[1]}
                    <Button
                        variant="contained"
                        color="primary"
                        type={"submit"}
                        onClick={() => purchaseArticle(articleOnChain)}
                    >
                        Primary
                    </Button>
                </p>
            </div>
        )
    }

    return (
        <div>
            <h1>Article title</h1>
            {article.content}
        </div>
    )
}

export default ArticlePage;