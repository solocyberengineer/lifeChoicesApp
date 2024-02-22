import express from 'express';
import bodyParser from 'body-parser';
import {users} from '../model/index.js';
import { verifyAToken } from '../middleware/AuthenticationUser.js';

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
    try {
        users.fetchUsers(req, res);
    } catch(e) {
        console.log(e)
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users'
        })
    }
})
// Fetch User
userRouter.get('/:id', (req, res)=>{
    try {
        users.fetchUser(req, res);
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
        console.log(e);
        res.json({
            status: res.statusCode,
            msg: "Failed to add a new user."
        })
    }
})
userRouter.patch('/updateuser', (req, res)=>{
    try {
        users.updateUser(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Error trying to update user"
        })
    }
})
userRouter.delete('/deleteuser/:id', (req, res)=>{
    try {
        users.deleteUser(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Error trying to delete user"
        })
    }
})
userRouter.post('/login', (req, res)=>{
    try {
        users.loginUser(req, res);
    } catch(e) {
        res.json({})
    }
})

export {
    userRouter,
    express
}