import {GET_ARTICLE_SUCCESS} from "../actionTypes";

const initialState = [
    {
        "description": "test"
    },
    {
        "description": "test"
    },
    {
        "description": "test"
    },
    {
        "description": "test"
    },
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE_SUCCESS: {
            const {id, article} = action.payload;

            let newState = [...state];

            newState.splice(
                id,
                1,
                article
            );
            return newState
        }
        default:
            return state;
    }
}
