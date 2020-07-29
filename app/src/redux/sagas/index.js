import {call, put, takeEvery} from 'redux-saga/effects'
import axios from "axios";
import {
    GET_ARTICLE_FAILED,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS
} from "../actionTypes";

function* fetchArticle(action) {
    try {
        const id = action.payload.id;
        const article = yield call(fetchArticleHttp, id);

        yield put({
            type: GET_ARTICLE_SUCCESS,
            payload: {
                "article": article,
                "id": id
            }
        });
    } catch (e) {
        console.log(e);
        yield put({type: GET_ARTICLE_FAILED, message: e.message});
    }
}

async function fetchArticleHttp(id) {
    try {
        return await axios.get('http://localhost:8080/article/' + id).then(response => {
            return response.data
        })
    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeEvery(GET_ARTICLE_REQUEST, fetchArticle);
}

export default mySaga;