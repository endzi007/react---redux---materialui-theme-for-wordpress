import { types } from "./serverDataDuck";
import _ from "underscore";

//this middleware is used to normalize data before storing it into redux store
export default (store)=>(next)=>(action)=>{
    console.log(action.payload);
    let modifiedPayload = [];
    switch(action.type){
        case types.ADD_CATEGORIES:
            modifiedPayload = action.payload.categories.edges.map((cat)=>{
                return recursiveFlat(cat);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_PAGES:
            modifiedPayload = action.payload.pages.nodes.map((page)=>{
                return recursiveFlat(page);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_DISPLAY_POSTS:
            modifiedPayload = action.payload.posts.nodes.map((post)=>{
                return recursiveFlat(post);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_TAGS:
            modifiedPayload = action.payload.tags.nodes.map((tag)=>{
                return recursiveFlat(tag);
            });
            action.payload = modifiedPayload;
            break;
        case types.ADD_PRIMARY_MENU:
            modifiedPayload = flattenMenuItems(action.payload.menus.nodes[0].menuItems.nodes, [], null);
            action.payload = modifiedPayload;

            break;
        default: 
            break;

    }
    next(action);
}

let newObj = {};

//this function takes object from api and returns 
//clean object with nested categories without unecessary keys like (edges...)
function recursiveFlat(obj){
    for(let key in obj){
        if(key === "nodes" || key === "edges" || key === "node" || typeof key !== "string"){
            obj = recursiveFlat(obj[key]);
        } else if (key === "children" || key === "childItems"){
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

function normalizeMenuItems(menu){
    
    if(menu.length !== undefined){
        //array 
        menu = menu.map((item)=>{
            return normalizeMenuItems(item);
        })
    } else{
        //object
        if("childItems" in menu){
            //check if object has key childItems
            //and check if nodes array inside of childItems is !empty
            if(menu["childItems"].nodes.length > 0 ){
                //then loop trough nodes array and call normalizeMenuItems recursively
                menu["childItems"] = normalizeMenuItems(menu["childItems"].nodes);
            } else {
                //return array of objects without 
                return menu;
            }
        } else {
            return menu;
        }
    }
    return menu;
} 

function flattenMenuItems(arr, newArr, parent){
    //loop trough arr
    arr.map((item)=>{
        //check if item has key childItems
        if("childItems" in item){
            newArr.push({...item, parent: parent});
            newArr.concat(flattenMenuItems(item["childItems"].nodes, newArr, item.label))
        } else {
            newArr.push({...item, parent: parent});
        }
    })
    return newArr;
} 
