import React from "react";

const ArticleDisplay = (props) => {
    const {article} = props;

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