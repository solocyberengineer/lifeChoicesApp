import { createPool } from 'mysql';
import { config } from "dotenv";

config()

let connection = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_USERPASS,
    multipleStatements: true,
    connectionLimit: 30
})

export {
    connection
}