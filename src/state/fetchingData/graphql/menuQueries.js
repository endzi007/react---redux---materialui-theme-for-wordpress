export const getMenuBySlug =  (fields, slug)=> `
    menus(where:{slug: "${slug}"}) {
      nodes {
        menuItems {
          nodes {
            ${fields}
            childItems {
              nodes {
                ${fields}
                childItems{
                  nodes{
                    ${fields}
                  }
                }
              }
            }
          }
        }
      }
    }`