import ApolloClient, { gql } from 'apollo-boost';
import settings from '../../appSettings';

const client = new ApolloClient({
    uri: settings.api
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

  