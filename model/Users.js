import { connection as db } from "../config/index.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../middleware/AuthenticationUser.js";
import { config } from "dotenv";

config();

const ROUNDS = process.env.ROUNDS;

class Users {
    fetchUser(req, res){
        const qry = `SELECT userID, firstName, lastName, emailAdd, gender, userRole, userAge, userPwd FROM Users WHERE userID = ${req.params.id}`;

        db.query(qry, (err, result) => {
            if(err) throw err;
            res.json({
                status: res.statusCode,
                result
            })
        })
    }
    fetchUsers(req, res){
        const qry = `SELECT userID, firstName, lastName, userAge, gender, emailAdd, userRole FROM Users;`;

        db.query(qry, (err, results)=>{
            if( err ) throw err;
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    async createUser(req, res){
        let data = req.body;
        
        data.userPwd = await hash(data.userPwd, ROUNDS);

        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }

        const qry = `INSERT INTO Users SET ?;`;
        db.query(qry, [data], (err)=>{
            if(err){
                res.json({
                    status: res.statusCode,
                    msg: "Account already exists"
                })
            } else {
                console.log('flag')
                let token = createToken(user);
                console.log(token)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: "You are registered"
                })
            }
        });
    }
    updateUser(req, res){
        let data = req.body;
        const qry = `UPDATE Users SET ? WHERE userID = ${data.userID}`

        db.query(qry, [data], (err)=>{
            if(err) {
                res.json({
                    status: res.statusCode,
                    msg: "An Error Occurred"
                })
            } else {
                res.json({
                    status: res.statusCode,
                    msg: "Updated profile"
                })
            }
            
        })        
    }
    deleteUser(req, res){
        const qry = `DELETE FROM Users WHERE userID = ${req.params.id}`

        db.query(qry, (err)=>{
            if(err) throw err;
            res.json({
                status: res.statusCode,
                msg: "User deleted"
            })
        })
    }
    async loginUser(req, res){
        let data = req.body;
        data.userPwd = await hash(req.userPwd, ROUNDS);



        // if( data.userPwd ==  
    }
}

export {
    Users
}