import { types } from "./serverDataDuck";
import appSettings from "../../appSettings";

let apis = {
    "graphql": {

    },
    "rest":()=>{
        return new Promise((res, rej)=>{
            return fetch(appSettings.api)
        });
    },
    "wp-json": ()=>{
        return new Promise((res, rej)=>{
            return fetch(appSettings.api)
        });
    }
}
//this middleware is used to normalize data before storing it into redux store
export default (store)=>(next)=>(action)=>{
    let modifiedPayload = [];
    switch(action.type){

    }

    next(action);
}
