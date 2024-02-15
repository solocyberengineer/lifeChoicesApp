import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

function createToken(user){
    return sign({
        emailAdd: user.emailAdd,
        userpwd: userPwd
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    })
}

function verifyAToken(req, res, next){
    // Retrieve a token from the browser
    const token = req?.headers["Authorization"];
    if(token){
        if(verify(token, process.env.SECRET_KEY)){
            next();
        } else {
            res?.json({
                status: res.statusCode,
                msg: "Please provide the correct credentials"
            })
        }
    } else {
        res?.json({
            status: res.statusCode,
            msg: "Please Login"
        })
    }
}

export {
    createToken,
    verifyAToken
}