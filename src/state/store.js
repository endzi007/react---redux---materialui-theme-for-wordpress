import { createStore, applyMiddleware } from "redux";
import { defaultState as serverDataState } from "./serverData/serverDataDuck";
import { logger } from "redux-logger";
import reducers from './reducers';
import middlewares from "./middlewares";
let defaultState = {
    serverData: serverDataState
}




let store = createStore(reducers, defaultState, applyMiddleware(...middlewares, logger));

export default store;