import {
    ApolloClient,
    InMemoryCache,
    split, 
    HttpLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'; 
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
 
// Http link
const httpLink = new HttpLink({
    uri: "http://localhost:5000"
});

// Web socket link 
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5000',
}));

// Split link
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

// Set up Apollo client 
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export { client }; 
