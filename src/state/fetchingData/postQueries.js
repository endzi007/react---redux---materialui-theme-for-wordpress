//props should be string that reprezents what we want to 
//retreive from graphql server for example "name url id"

export const getAllPosts = (props)=> `
  posts {
      nodes {
        ${props}
      }
  }
`;

export const getPostsByCategoryName = (fields, categoryName)=> `
  posts (where:{categoryName: "${categoryName}" }) {
      nodes {
        ${fields}
      }
  }
`;

export const getPostByTitle = (fields, title)=> `
  posts (where:{title: "${title}" }) {
    edges {
      node {
        ${fields}
      }
    }
  }
`;

