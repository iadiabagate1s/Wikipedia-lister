import app from './src/app.js'; // Importing app from app
import http from 'http'; // Importing http module// Importing initializeDatabase from db/index
import initializeDatabase from './src/db/index.js';
import 'dotenv/config' 

const port = process.env.PORT || 8889; // Setting port number

// Starting server using listen function
const server =  http.createServer(app);

server.listen(port, function () {
    console.log("inside server.listen");
    initializeDatabase();


       console.log("Server has been started at "+port);
       console.log("http://+localhost:",port);
   }
)