import React from "react";
import {drizzleReactHooks} from '@drizzle/react-plugin'
import ArticlePreview from "./ArticlePreview";

const ListArticles = () => {
    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    // todo Maybe more efficient to pull this from the store if it is available
    const articles = useCacheCall('NewsPayPer', 'getArticles');

    if (undefined === articles) {
        return (
            <div>Loading articles...</div>
        )
    }

    if (0 === articles.length) {
        return (
            <div>
                No articles written
            </div>
        )
    }

    return (
        <div>
            <h1>List of available articles</h1>
            {articles.map(function (object, i) {
                return <ArticlePreview
                    key={i}
                    id={i}
                />;
            }.bind(this))}
        </div>
    )
}

export default ListArticles;