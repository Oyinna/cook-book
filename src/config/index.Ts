import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mogodb_url: process.env.MONGODB_URI,
    access_token: process.env.ACCESS_TOKEN_SECRET
};

export {config}