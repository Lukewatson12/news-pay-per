import {
    GET_ARTICLE_SUCCESS
} from "./actionTypes";

export const getArticle = (id, article) => ({
    type: GET_ARTICLE_SUCCESS,
    payload: {
        article: article,
        id: id
    }
});
