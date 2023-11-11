const express = require('express')
const cors = require('cors');
const fs = require('fs');
const { db } = require('./db/database');
const {readdirSync} = require('fs');
const { registerUser } = require('./controller/user');
const { errorhandler } = require('./middleware/error');
const userRoute = require('./routes/userrt');
const app = express()

require('dotenv').config()

const PORT = 3000;

//middlewares
app.use(express.json())
app.use(cors())
//routes
app.use("/api/user" , userRoute);
// Read the contents of the './routes' directory synchronously
const routes = fs.readdirSync('./routes');

routes.forEach((route) => {
    // Require each file and use it as a route under '/api/v1'
    const routePath = './routes/' + route;
    const routeModule = require(routePath);
    app.use('/api/v1', routeModule);
});

//error
app.use(errorhandler);


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()