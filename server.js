require('dotenv').config(); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const cors = require('cors'); 
const passport = require('passport'); 
const typeDefs = require('./schema/schema'); 
const resolvers = require('./resolvers/resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema'); 
const routes = require('./routes');  
const { User, Session } = require('./models/User');
const { getUser, getToken} = require('./utils/authenticate');
const Post = require('./models/Post'); 
const { ApolloServer } = require('apollo-server-express'); 
const Users = require('./datasources/mongodb-datasources/users');
const Posts = require('./datasources/mongodb-datasources/posts');
const {
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core'); 
const express = require('express'); 
const http = require('http');
const { WebSocketServer } = require('ws'); 
const { useServer } = require('graphql-ws/lib/use/ws'); 
const PORT = process.env.PORT || 5000; 

const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();
    const httpServer = http.createServer(app);

    // Connect to Database
    require('./config/connectdb'); 

    // Local Strategy 
    require('./strategies/LocalStrategy');

    // Middleware
    app.use(cors({
        origin: [
            "http://localhost:3000",
            "https://studio.apollographql.com"
        ],
        credentials: true
    })); 
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); 
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(passport.initialize());

    // Routes
    routes(app, User, Session);

    // Schema 
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Subscription server 
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/"
    });

    // Datasources 
    const users = new Users(User);
    const posts = new Posts(Post); 

    // Server clean up
    const serverCleanup = useServer({
        schema,
        context: async (ctx, msg, args) => {
            let token = getToken({ _id: "62c9da370bd03a3ab67c4be3" })
            let user = await getUser(token)
            if (user === null) {
                throw new Error("Unauthorized")
            }
            return {
                user,
                dataSources: {
                    users, 
                    posts
                }
            }
        }
    }, wsServer); 

    // Apollo server 
    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            users, 
            posts
        }),
        context: async ({ req }) => {
            //let token = connection ? connection.context?.authorization || ""
            //    : req.headers?.authorization.replace(/bearer\s/i, "") || ""
            let token = getToken({ _id: "62c9da370bd03a3ab67c4be3" })
            let user = await getUser(token)
            if (user === null) {
                throw new Error("Unauthorized")
            }
            return {user}
        },
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
/*            ApolloServerPluginLandingPageGraphQLPlayground(),*/
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    await server.start(); 

    server.applyMiddleware({
        app, 
        path: '/',
        cors: {
            origin: [
                "http://localhost:3000",
                "https://studio.apollographql.com"
            ], 
            credentials: true
        }
    })

    httpServer.listen(process.env.PORT, () => console.log(`Server is listening on port ${PORT}`))

}

startApolloServer(typeDefs, resolvers);

