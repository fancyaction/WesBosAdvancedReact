const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');




const server = createServer();

server.express.use(cookieParser());

// TODO User middleware to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
},
    details => {
        console.log(`Server now running on port http:/localhost:${details.port}`)
});
