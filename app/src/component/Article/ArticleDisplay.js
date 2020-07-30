import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {shallowEqual, useSelector} from 'react-redux'

const ArticleDisplay = (props) => {
    const {id} = props;


    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        articles: drizzleState.articles
    }))

    console.log(drizzleState)
    return (
        <div>
            Loading article
        </div>
    )
    //
    // if (article) {
    //     return (
    //         <div>
    //             <h1>Article title</h1>
    //             {article.description}
    //         </div>
    //     )
    // }

    return (
        <div>
            Loading article
        </div>
    )
}

export default ArticleDisplay;