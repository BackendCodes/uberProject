const dotenv = require('dotenv')
dotenv.config();
const express = require("express")
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');

// database Connection
connectDB();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(morgan('dev'))


// routes

app.use('/auth',userRouter)


app.get('/',(req,res)=>{
    res.send("Hello lordsainath")
})


module.exports = app;