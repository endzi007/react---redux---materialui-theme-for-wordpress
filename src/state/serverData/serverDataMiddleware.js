import { types } from "./serverDataDuck";

//this middleware is used to normalize data before storing it into redux store
export default (store)=>(next)=>(action)=>{
    console.log(action.payload);
    let modifiedPayload = [];
    switch(action.type){
        case types.ADD_CATEGORIES:
            modifiedPayload = action.payload.edges.map((cat)=>{
                return recursiveFlat(cat);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_PAGES:
            modifiedPayload = action.payload.nodes.map((page)=>{
                return recursiveFlat(page);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_LATEST_POSTS:
            modifiedPayload = action.payload.nodes.map((post)=>{
                return recursiveFlat(post);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_TAGS:
            modifiedPayload = action.payload.nodes.map((tag)=>{
                return recursiveFlat(tag);
            });
            action.payload = modifiedPayload;
            break;
        default: 
            break;

    }
    next(action);
}

let newObj = {};
function recursiveFlat(obj){
    for(let key in obj){
        if(key === "edges" || key === "node" || typeof key !== "string"){
            obj = recursiveFlat(obj[key]);
        } else if (key === "children"){
            if(obj[key].edges !== null){
                obj[key] = obj[key].edges.map((cat)=>{
                    return recursiveFlat(cat);
                })
            } else {
                delete obj[key]
            }
        } else if( key === "__proto__" || key === "__typename"){
            delete obj[key];
        }
    }
    return obj;
} 
