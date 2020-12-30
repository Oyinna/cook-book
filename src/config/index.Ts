import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mogodb_url: process.env.MONGODB_URI
};

export {config}