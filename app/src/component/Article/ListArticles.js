import React, {useEffect, useState} from "react";
import Article from "./Article";

const ListArticles = (props) => {
    let {drizzle, drizzleState} = props;

    const [articlesKey, setArticlesKey] = useState(undefined)

    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const articlesStore = store.NewsPayPer;
    const articles = articlesStore.getArticles[articlesKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticles"].cacheCall();
        setArticlesKey(articleKey);
    }, [])

    if (undefined === articles) {
        return (
            <div>Loading articles...</div>
        )
    }

    if (0 === articles.value.length) {
        return (
            <div>
                No articles written
            </div>
        )
    }

    return (
        <div>
            <h1>List of available articles</h1>
            {articles.value.map(function (object, i) {
                return <Article
                    key={i}
                    id={i}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                />;
            }.bind(this))}
        </div>
    )
}

export default ListArticles;