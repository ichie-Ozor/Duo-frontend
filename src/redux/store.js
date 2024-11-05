import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducers from "./reducers";

const createStoreWithMiddleware =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development"
        ? applyMiddleware(thunk, logger)(createStore)
        : applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
