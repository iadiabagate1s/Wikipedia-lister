import { Sequelize } from 'sequelize';
import 'dotenv/config';


const dbCredDev = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydatabase',
  dialect: 'mysql',
};


const db = new Sequelize(dbCredDev.database, dbCredDev.username, dbCredDev.password, {
  host: dbCredDev.host,
  port: dbCredDev.port,
  dialect: dbCredDev.dialect,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;

