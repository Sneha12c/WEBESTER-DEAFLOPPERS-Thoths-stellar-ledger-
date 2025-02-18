const express = require('express')
const cors = require('cors');
const { db } = require('./db/database');
const { errorhandler } = require('./middleware/error');
const userRoute = require('./routes/userrt');
const trackrouter = require('./routes/track');
const extractrouter = require('./routes/extractrt');
const app = express();
const {PORT} = require('./constant');
//middlewares
app.use(express.json())
app.use(cors())
//routes
app.use("/api/user" , userRoute);
app.use("/api/track" , trackrouter);
app.use("/api/extract" , extractrouter);
//error
app.use(errorhandler);


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server();