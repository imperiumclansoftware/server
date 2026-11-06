const express= require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const usersRoutes = require('./app/routes/users-routes');
const authRoutes = require('./app/routes/auth-routes');

const errorsMiddleWare = require('./app/middlewares/errors-middleware');
const rateLimiterMiddleware = require('./app/middlewares/rateLimiter-middleware');

const fs = require('fs');
const morgan = require('morgan');
const path = require('node:path');
const dotenv = require('dotenv');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
})

dotenv.config({
    path: path.join(__dirname, process.env.NODE_ENV == "prod" ? '.env.prod' : '.env.local')
});

app.set('host', process.env.HOST);
app.set('port', process.env.PORT);

app.use(express.urlencoded({extended: true, limit: '100kb'}));
app.use(express.json({limit: '100kb'}));

app.use(rateLimiterMiddleware.global);

app.use(cors());
app.use(helmet());
app.use(morgan("combined",{stream: accessLogStream}))

app.get('/',(request,response) => {
return response.json({message: 'Hello World !'});
});

app.get('/lupa',(request,response) => {
return response.json({url: 'https://github.com/imperiumclansoftware/lupa'});
});

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorsMiddleWare);

app.listen(app.get('port'),app.get('host'),() => { 
    const message = `Server start on http://${app.get('host')}:${app.get('port')}`;
    console.log(message); 
});
