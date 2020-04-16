import { combineReducers} from "redux";
import serverDataReducer from './serverData/serverDataDuck';

const reducers = combineReducers({
    serverData: serverDataReducer
})

export default reducers;