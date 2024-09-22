#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db:3306 --timeout=30 --strict -- echo "Database is ready."

# Run the seed script
npm run seed

# Start the server
npm start
