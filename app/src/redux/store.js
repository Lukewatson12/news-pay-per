import rootReducer from "./reducers";
import rootSaga from './sagas';
import {generateStore} from "@drizzle/store";
import drizzleOptions from "../drizzleOptions";


const store = generateStore({
        "drizzleOptions": drizzleOptions,
        "disableReduxDevTools": false,
        "reducers": rootReducer,
        "appSagas": [rootSaga],
    },
);
console.log(store)
export default store;
