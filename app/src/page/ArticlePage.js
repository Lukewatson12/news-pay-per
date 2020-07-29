import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from 'react-redux'
import {useParams} from "react-router-dom";
import {getArticle} from "../redux/actions";
import {GET_ARTICLE_REQUEST} from "../redux/actionTypes";
import ArticleDisplay from "../component/Article/ArticleDisplay";
import PurchaseArticle from "../component/Article/PurchaseArticle";

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

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
        setArticleKey(articleKey);
    }, [articleId, newsPayPerContract.methods["getArticle"]])

    useEffect(() => {
        let hasArticleKey = newsPayPerContract.methods["hasArticle"].cacheCall(
            articleId,
            {
                "from": drizzleState.accounts[0]
            }
        );
        setHasArticleKey(hasArticleKey);
    }, [articleId, newsPayPerContract.methods["hasArticle"], drizzleState.accounts[0]])

    if (undefined === articleKey || undefined === articleOnChain || undefined === hasArticle) {
        return (
            <div>Loading Article {articleId}</div>
        )
    }

    if (false === hasArticle.value) {
        return (
            <PurchaseArticle
                id={articleId}
                drizzle={drizzle}
                drizzleState={drizzleState}
                article={articleOnChain}
            />
        )
    }

    return (
        <ArticleDisplay
            id={articleId}
        />
    )
}

export default ArticlePage;