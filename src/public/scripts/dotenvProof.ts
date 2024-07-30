import dotenv from 'dotenv';

// Especifica el archivo .env.local
dotenv.config({ path: '.env.local' });

console.log('DB Host:', process.env.DB_HOST);
console.log('DB Port:', process.env.DB_PORT);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASS);
console.log('DB Name:', process.env.DB_NAME);