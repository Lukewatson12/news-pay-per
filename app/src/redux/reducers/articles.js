import {
    GET_ARTICLE
} from "../actionTypes";

const initialState = [
    {
        "content": "test"
    },
    {
        "content": "test"
    },
    {
        "content": "test"
    },
    {
        "content": "test"
    },
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE: {
            const {id} = action.payload;

            let articles = state.articles;
            articles.splice(id, id, "test");
            console.log(articles);
            let newState = {...state};
            newState.articles = articles;

            return newState;
        }
        default:
            return state;
    }
}
