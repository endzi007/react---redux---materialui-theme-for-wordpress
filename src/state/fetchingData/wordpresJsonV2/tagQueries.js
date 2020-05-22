import appSettings from "../../../appSettings";

//get all categories
export const getAllCategories = () =>{
    return fetch(`${appSettings.api}/wp/v2/tags`);
}