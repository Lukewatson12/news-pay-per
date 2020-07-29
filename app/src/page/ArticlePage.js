import React, {useCallback, useEffect, useState} from "react";
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {getArticle} from "../redux/actions";
import {GET_ARTICLE_REQUEST} from "../redux/actionTypes";

const ArticlePage = (props) => {
    // far too many rerenders here
    console.log("rerender");
    const {articleId} = useParams();
    const {drizzle, drizzleState} = props;
    const [articleKey, setArticleKey] = useState(undefined)
    const [hasArticleKey, setHasArticleKey] = useState(false)
    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const dispatch = useDispatch()

    const articleOnChain = store.NewsPayPer.getArticle[articleKey];
    const hasArticle = store.NewsPayPer.hasArticle[hasArticleKey];

    const getArticle = useCallback(
        () => dispatch({
            type: GET_ARTICLE_REQUEST,
            payload: {
                "id": articleId
            },
        }),
        [dispatch]
    )

    getArticle()

    const article = useSelector(
        (state) => state.articles[articleId],
        shallowEqual
    )

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

    if (undefined === articleKey || undefined === articleOnChain || undefined === hasArticle || undefined === article) {
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
            {article.description}
        </div>
    )
}

export default ArticlePage;