import { userRouter, express } from './controller/UserController.js';
import { productRouter } from './controller/ProductController.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from "dotenv";
import { errorHandling } from './middleware/ErrorHandling.js';
import path from 'path';

config()

const app = express()
const PORT = +process.env.PORT || 4000;

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
})
app.use( 
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cookieParser(),
    cors()
)
app.use('/user', userRouter);
app.use('/product', productRouter)

app.get('^/$|/lifeChoicesApp', (req, res)=>{
    res.status(200).sendFile('/static/index.html');
});

app.listen(PORT, ()=>{
    console.log(`Server is running: http://localhost:${PORT}`)
})