import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";

const Article = (props) => {
    let {id, drizzle, drizzleState} = props;
    const [articleKey, setArticleKey] = useState(undefined)

    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const article = store.NewsPayPer.getArticle[articleKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(id);
        setArticleKey(articleKey);
    }, [])

    if (undefined === articleKey || article === undefined) {
        return (
            <div>Loading article {id}</div>
        )
    }

    return (
        <Paper>
            <h3>Article id is {id}</h3>
            <h3>Article cost is {article.value[1]}</h3>
            <Link to={"articles/" + id}>
                Read article
            </Link>
        </Paper>
    )
}

Article.propTypes = {
    id: PropTypes.number.isRequired
};

export default Article;