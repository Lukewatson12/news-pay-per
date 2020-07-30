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
    const hasArticle = useCacheCall('NewsPayPer', 'hasArticle', [id]);
    const articleOnChain = useCacheCall('NewsPayPer', 'getArticle', [id]);

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

    if (undefined === hasArticle) {
        return (
            <div>Loading Article {id}</div>
        )
    }

    if (false === hasArticle.value) {
        return (
            <PurchaseArticle
                id={id}
                article={articleOnChain}
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