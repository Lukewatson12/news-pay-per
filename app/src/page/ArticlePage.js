import React, {useCallback} from "react";
import {useParams} from "react-router-dom";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import PurchaseArticle from "../component/Article/PurchaseArticle";
import ArticleDisplay from "../component/Article/ArticleDisplay";
import {GET_ARTICLE_REQUEST} from "../redux/actionTypes";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const ArticlePage = () => {
    // far too many rerenders here
    console.log("rerender");

    const {id} = useParams();
    const dispatch = useDispatch()
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    const articleOnChain = useCacheCall('NewsPayPer', 'getArticle', [id]);
    const hasArticle = useCacheCall('NewsPayPer', 'hasArticle', [id]);

    const fetchArticle = useCallback(
        () => dispatch({
            type: GET_ARTICLE_REQUEST,
            payload: {
                "id": id
            },
        }),
        [dispatch]
    )

    const article = useSelector(
        (state) => state.articles[id],
        shallowEqual
    );

    if (undefined === hasArticle || undefined === articleOnChain) {
        return (
            <div>Loading Article {id}</div>
        )
    }

    if (false === hasArticle) {
        return (
            <PurchaseArticle
                id={id}
                articleOnChain={articleOnChain}
            />
        )
    }

    fetchArticle();

    return (
        <ArticleDisplay
            article={article}
        />
    )
}

export default ArticlePage;