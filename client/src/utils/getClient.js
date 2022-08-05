import {
    ApolloClient,
    InMemoryCache,
    split,
    HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
export const getClient = token => {
    // Http link
    const httpLink = new HttpLink({
        uri: "http://localhost:5000"
    })

    // Authentication link 
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers, 
                authorization: token ? `bearer ${token}` : ""
            }
        }
    })

    // Web socket link 
    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:5000',
        connectionParams: {
            authentication: token ? token : ""
        }
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
        authLink.concat(httpLink, authLink)
    );

    // Cache 
    const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        merge(existing, incoming) {
                            return incoming
                        }
                    }
                }   
            },
            Post: {
                fields: {
                    likes: {
                        merge(existing, incoming) {
                            return incoming 
                        }
                    }, 
                    comments: {
                        merge(existing, incoming) {
                            return incoming
                        }
                    }
                }
            }, 
            Like: {
                keyFields: ["userId"]
            }
        }
    })

    // Set up Apollo client 
    const client = new ApolloClient({
        link: splitLink,
        cache
    })

    return client
}
