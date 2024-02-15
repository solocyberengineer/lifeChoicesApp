import express from 'express';
import bodyParser from 'body-parser';
import {users} from '../models/index.js';
import { verifyAToken } from '../middleware/AuthenticationUser.js';

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
    try {
        users.fetchUsers(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users'
        })
    }
})
// Fetch User
userRouter.get('/:id', (req, res)=>{
    try {
        users.fetchUsers(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve a user"
        })
    } 
})
// Add a user
userRouter.post('/register', bodyParser.json(), (req, res)=>{
    try {
        users.createUser(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add a new user."
        })
    }
})

export {
    userRouter,
    express
}