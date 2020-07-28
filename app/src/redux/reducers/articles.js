import {
    GET_ARTICLE
} from "../actionTypes";

const initialState = {
    byIds: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE: {
            const {id} = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        content,
                        completed: false
                    }
                }
            };
        }
        default:
            return state;
    }
}
