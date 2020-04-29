
//putting a name of duck is useful when reading logs 
const duckName = "serverData"
export const types = {
    ADD_CATEGORIES: `${duckName}/ADD_CATEGORIES`,
    ADD_TAGS: `${duckName}/ADD_TAGS`,
    ADD_PAGES: `${duckName}/ADD_PAGES`,
    ADD_DISPLAY_POSTS: `${duckName}/ADD_DISPLAY_POSTS`,
    ADD_CURRENT_POST: `${duckName}/ADD_CURRENT_POST`,
    ADD_CURRENT_CATEGORY: `${duckName}/ADD_CURRENT_CATEGORY`,
    ADD_PRIMARY_MENU: `${duckName}/ADD_PRIMARY_MENU`,
    ADD_SEARCH_RESULTS: `${duckName}/ADD_SEARCH_RESULTS`,
}

export const creators = {
    addCategories: (data)=>({type: types.ADD_CATEGORIES, payload: data }),
    addDisplayPosts: (data)=>({type: types.ADD_DISPLAY_POSTS, payload: data}),
    addTags: (data)=>({type: types.ADD_TAGS, payload: data}),
    addPages: (data)=>({type: types.ADD_PAGES, payload: data}),
    addCurrentPost: (data)=>({type: types.ADD_CURRENT_POST, payload: data}),
    addCurrentCategory: (data)=>({type: types.ADD_CURRENT_CATEGORY, payload: data}),
    addPrimaryMenu: (data)=>({type: types.ADD_PRIMARY_MENU, payload: data}),
    addSearchResults: (data)=>({type: types.ADD_SEARCH_RESULTS, payload: data})
}


export const defaultState = {
    categories: [],
    tags: [],
    pages: [],
    displayPosts: [],
    currentPost: {},
    currentCategory: {},
    primaryMenu: [],
    searchResults: []
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
        case types.ADD_DISPLAY_POSTS: 
            newState.displayPosts = action.payload;
            return newState;
        case types.ADD_CURRENT_CATEGORY: 
            newState.currentCategory = action.payload;
            return newState;
        case types.ADD_CURRENT_POST:
            newState.currentPost = action.payload;
            return newState;
        case types.ADD_PRIMARY_MENU: 
            newState.primaryMenu = [...action.payload];
            return newState;
        case types.ADD_SEARCH_RESULTS:
            newState.searchResults = action.payload;
            return newState;
        default: 
            return newState;
    }
}