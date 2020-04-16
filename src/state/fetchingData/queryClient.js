import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://dedex-video-downloader.com/graphql"
});

export default client;


export const sendQueryRequest = (queryFns)=>{
    let joinQueries = queryFns.reduce((acc, curr)=>{
        return acc += curr;
    }, "")
    return client.query({ query: gql`
      {
        ${joinQueries}
      }
    `})
  }

  