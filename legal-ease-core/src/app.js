import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import {routerInstance} from './routes/index.js';
import 'dotenv/config'


const app = express(); 

const morganMiddleware = morgan('dev'); // ? 
app.use(morganMiddleware); // ?
//Routes

const corsOptions = {
    origin: 'http://localhost:3000',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true,  // Allow sending cookies and credentials
  };
  
app.use(cors(corsOptions));

app.options('*', cors());  // Allow preflight requests for all routes


app.use(express.json());
app.use(bodyParser.json({ limit: '500mb' }));  // ? Ensure this is also set
app.use(bodyParser.urlencoded({ limit: '500mb',extended: true }));

app.use('/api', routerInstance);

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Legal Ease API' });
});

export default app;