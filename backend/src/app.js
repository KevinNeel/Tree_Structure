import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

//Database
import db_Conn from './db_Con/db_Conn.js';

//Routes
import user from './route/userRoute.js'
import tree from './route/treeRoute.js';

const port = 8000 || process.env.PORT;

//DataBase Connection
db_Conn()

app.use(cors());
app.use(express.json());
app.set(express.urlencoded({extended: false}));

app.use('/api/v1/user', user)
app.use('/api/v1/tree', tree)

app.listen(port, ()=>{
    console.log(`Server is running at port:${port}`);
})