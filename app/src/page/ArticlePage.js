import React from "react";
import {useParams} from "react-router-dom";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import PurchaseArticle from "../component/Article/PurchaseArticle";
import ArticleDisplay from "../component/Article/ArticleDisplay";

const ArticlePage = () => {
    // far too many rerenders here
    console.log("rerender");

    const {id} = useParams();

    const {useCacheCall} = drizzleReactHooks.useDrizzle()
    const hasArticle = useCacheCall('NewsPayPer', 'hasArticle', [id]);
    const article = useCacheCall('NewsPayPer', 'getArticle', [id]);

    if (undefined === hasArticle) {
        return (
            <div>Loading Article {id}</div>
        )
    }


    if (false === hasArticle.value) {
        return (
            <PurchaseArticle
                id={id}
                article={article}
            />
        )
    }

    return (
        <ArticleDisplay
            id={id}
        />
    )

    // // const {drizzle, drizzleState} = props;
    // // const [articleKey, setArticleKey] = useState(undefined)
    // // const [hasArticleKey, setHasArticleKey] = useState(false)
    // // const newsPayPerContract = drizzle.contracts.NewsPayPer;
    // // const store = drizzleState.contracts;
    // const dispatch = useDispatch()
    //
    // const articleOnChain = store.NewsPayPer.getArticle[articleKey];
    //
    // const getArticle = useCallback(
    //     () => dispatch({
    //         type: GET_ARTICLE_REQUEST,
    //         payload: {
    //             "id": articleId
    //         },
    //     }),
    //     [dispatch]
    // )
    //
    // getArticle()
    //
    // useEffect(() => {
    //     let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
    //     setArticleKey(articleKey);
    // }, [articleId, newsPayPerContract.methods["getArticle"]])
    //
    // useEffect(() => {
    //     let hasArticleKey = newsPayPerContract.methods["hasArticle"].cacheCall(
    //         articleId,
    //         {
    //             "from": drizzleState.accounts[0]
    //         }
    //     );
    //     setHasArticleKey(hasArticleKey);
    // }, [articleId, newsPayPerContract.methods["hasArticle"], drizzleState.accounts[0]])
    //
    // if (undefined === articleKey || undefined === articleOnChain || undefined === hasArticle) {
    //     return (
    //         <div>Loading Article {articleId}</div>
    //     )
    // }
    //
    // if (false === hasArticle.value) {
    //     return (
    //         <PurchaseArticle
    //             id={articleId}
    //             drizzle={drizzle}
    //             drizzleState={drizzleState}
    //             article={articleOnChain}
    //         />
    //     )
    // }
    //
    // return (
    //     <ArticleDisplay
    //         id={articleId}
    //     />
    // )
}

export default ArticlePage;