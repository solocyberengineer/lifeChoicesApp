import { connection as db } from "../config/index.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../middleware/AuthenticationUser.js";

class Users {
    fetchUser(req, res){
        const qry = `SELECT FROM Users WHERE userID = ${req.params.id}`;

        db.query(qry, (err, result) => {
            if(err) throw err;
            res.json({

            })
        })
    }
    fetchUsers(req, res){
        const query = `SELECT userID, firstName, lastName, userAge, gender, emailAdd, userRole FROM Users;`;

        db.query(qry, (err, results)=>{
            if( err ) throw err;
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    createUser(req, res){
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `INSERT INTO Users SET ?;`;
        db.query(qry, [data], (err)=>{
            if(err){
                res.json({
                    status: res.statusCode,
                    msg: "Please already exists"
                })
            } else {
                let token = createToken(user);
                res.json({
                    status: res.statusCode,
                    token,
                    msg: "You are registered"
                })
            }
        });
    }
}