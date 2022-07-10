require('dotenv').config(); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const cors = require('cors'); 
const passport = require('passport'); 
const typeDefs = require('./schema/schema'); 
const resolvers = require('./resolvers/resolvers'); 
const routes = require('./routes');  
const { User, Session} = require('./models/User'); 
const { ApolloServer } = require('apollo-server-express'); 
const {
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core'); 
const express = require('express'); 
const http = require('http');
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
        origin: "http://localhost:3000",
        credentials: true
    })); 
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); 
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(passport.initialize());

    // Routes
    routes(app, User, Session); 

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });

    await server.start(); 

    server.applyMiddleware({
        app, 
        path: '/',
        cors: {
            origin: ["http://localhost:3000"], 
            credentials: true
        }
    })

    httpServer.listen(process.env.PORT, () => console.log(`Server is listening on port ${PORT}`))

}

startApolloServer(typeDefs, resolvers);

