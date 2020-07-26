import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";

const ArticlePage = (props) => {
    const {articleId} = useParams();
    let {drizzle, drizzleState} = props;

    const [articleKey, setArticleKey] = useState(undefined)
    const [hasArticleKey, setHasArticleKey] = useState(false)

    const newsPayPerContract = drizzle.contracts.NewsPayPer;
    const store = drizzleState.contracts;
    const article = store.NewsPayPer.getArticle[articleKey];
    const hasArticle = store.NewsPayPer.hasArticle[hasArticleKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
        setArticleKey(articleKey);
    }, [articleId, newsPayPerContract])

    useEffect(() => {
        let hasArticleKey = newsPayPerContract.methods["hasArticle"].cacheCall(
            articleId,
            {
                "from": drizzleState.accounts[0]
            }
        );
        setHasArticleKey(hasArticleKey);
    }, [articleId, newsPayPerContract, drizzleState])

    const purchaseArticle = useCallback((article) => {
        newsPayPerContract.methods["purchaseArticle"].cacheSend(
            articleId,
            {
                "from": drizzleState.accounts[0],
                "value": article.value[1]
            }
        );
    }, [newsPayPerContract, drizzleState, articleId]);


    if (undefined === articleKey || undefined === article || undefined === hasArticle) {
        return (
            <div>Loading Article {articleId}</div>
        )
    }

    if (false === hasArticle.value) {
        return (
            <div>
                <p>Article cost is {article.value[1]}
                    <Button
                        variant="contained"
                        color="primary"
                        type={"submit"}
                        onClick={() => purchaseArticle(article)}
                    >
                        Primary
                    </Button>
                </p>
            </div>
        )
    }

    return (
        <div>
            <h1>Article title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed consectetur erat, id cursus eros.
                Morbi ac tortor est. Nullam sit amet ex et ipsum sollicitudin molestie in sed ante. Fusce ac quam risus.
                Phasellus volutpat lectus velit, at malesuada augue imperdiet sit amet. Interdum et malesuada fames ac
                ante ipsum primis in faucibus. Mauris ut diam sit amet odio tincidunt maximus. Integer in nisi a lectus
                rhoncus commodo. Vestibulum sed mauris eu nulla scelerisque molestie. Phasellus efficitur, ligula
                gravida imperdiet faucibus, elit massa interdum tortor, non sodales tellus mi et tellus. Nulla dapibus
                rhoncus odio, vel fermentum purus mollis vel. Mauris viverra porttitor condimentum. Praesent
                pellentesque dui dolor, at pharetra metus tempor nec.
            </p>
            <p> Aliquam erat volutpat. Phasellus venenatis molestie erat, ut feugiat nunc tincidunt vel. Suspendisse ut
                euismod leo. Nam nec condimentum libero, sit amet consectetur risus. Maecenas ac enim rhoncus, maximus
                tortor id, rutrum neque. Nulla facilisi. Aliquam porttitor ex dolor, a elementum nibh lacinia ut. Duis
                luctus, velit non gravida convallis, leo massa luctus urna, nec posuere nisl nisl ac erat. In placerat
                convallis leo, eget cursus diam elementum at. Quisque mauris sapien, feugiat non lorem vel, bibendum
                malesuada dolor. Nullam rhoncus purus vel ante dapibus, id gravida dolor dignissim. Etiam laoreet sed
                ipsum a egestas.
            </p>
        </div>
    )
}

export default ArticlePage;