import React from "react";
import {shallowEqual, useSelector} from 'react-redux'

const ArticleDisplay = (props) => {
    const {id} = props;

    const article = useSelector(
        (state) => state.articles[id],
        shallowEqual
    );

    if (article) {
        return (
            <div>
                <h1>Article title</h1>
                {article.description}
            </div>
        )
    }

    return (
        <div>
            Loading article
        </div>
    )
}

export default ArticleDisplay;