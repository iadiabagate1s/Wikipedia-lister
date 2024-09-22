import {db} from './schema/index.js';
import mysql from 'mysql2/promise';

const initializeDatabase = async () => {
    console.log('inside initializeDatabase');
    try {

      // Connect to MySQL to check and create the database if it doesn't exist
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootpassword',
    });

    console.log('Connected to MySQL successfully!');

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log('Database legalEase_take_home checked/created successfully.');

    // Close the connection
    await connection.end();



      // * MAIN FUNCTION
      await db.sync({ alter: true }); // force <> alter
      console.log('Database & tables created or updated!-> A');
    } catch (err) {
      console.error('Error syncing with database:', err);
    }
  };
export default initializeDatabase;