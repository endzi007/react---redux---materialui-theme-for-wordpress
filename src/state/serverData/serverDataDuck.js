
//putting a name of duck is useful when reading logs 
const duckName = "serverData"
export const types = {
    ADD_CATEGORIES: `${duckName}/ADD_CATEGORIES`,
    ADD_TAGS: `${duckName}/ADD_TAGS`,
    ADD_PAGES: `${duckName}/ADD_PAGES`,
    ADD_LATEST_POSTS: `${duckName}/ADD_LATEST_POSTS`,
    ADD_CURRENT_POST: `${duckName}/ADD_CURRENT_POST`,
    ADD_CURRENT_CATEGORY: `${duckName}/ADD_CURRENT_CATEGORY`,
}

export const creators = {
    addCategories: (data)=>({type: types.ADD_CATEGORIES, payload: data }),
    addLatestPosts: (data)=>({type: types.ADD_LATEST_POSTS, payload: data}),
    addTags: (data)=>({type: types.ADD_TAGS, payload: data}),
    addPages: (data)=>({type: types.ADD_PAGES, payload: data}),
    addCurrentPost: (data)=>({type: types.ADD_CURRENT_POST, payload: data}),
    addCurrentCategory: (data)=>({type: types.ADD_CURRENT_CATEGORY, payload: data}),
}


export const defaultState = {
    categories: [],
    tags: [],
    pages: [],
    latestPosts: [],
    currentPost: {},
    currentCategory: {}
};


export default (state = defaultState, action )=>{
    let newState = {...state};
    switch(action.type){
        case types.ADD_CATEGORIES: 
            newState.categories = action.payload;
            return newState;
        case types.ADD_PAGES: 
            newState.pages = action.payload;
            return newState;
        case types.ADD_TAGS: 
            newState.tags = action.payload;
            return newState;
        case types.ADD_LATEST_POSTS: 
            newState.latestPosts = action.payload;
            return newState;
        case types.ADD_CURRENT_CATEGORY: 
            newState.currentCategory = action.payload;
            return newState;
        case types.ADD_CURRENT_POST:
            newState.currentPost = action.payload;
            return newState;
        default: 
            return newState;
    }
}