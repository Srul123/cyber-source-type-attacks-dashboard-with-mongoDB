const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const attackInfoRouter = require('./routers/attack-info');



const server = express();
server.use(cors({
    origin: 'http://localhost:4200'
}));
server.use(express.json());

const port = process.env.NODE_PORT || 5000;
server.listen(port, () => console.log(`server started on port ${port}`));


server.use(attackInfoRouter)


server.use((req, res, next)=> {
    const error = new Error('Not found any route to serve your request');
    error.status = 400;
    next(error);
})

server.use((error, req, res)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

