import { User, Search, db } from './schema/index.js';
import argon2 from 'argon2';

const seedData = async () => {
  console.log('Seeding data...');
  try {
    await db.sync({ force: true }); // Drop tables and recreate them

    const user = await User.create({
      email: 'test@example.com',
      password: await argon2.hash('password'),
    });

    await Search.create({
      query: 'legal case search',
      user_id: user.email,
    });

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();

