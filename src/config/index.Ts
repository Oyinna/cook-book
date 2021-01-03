import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongodb_url: process.env.MONGODB_URI,
    test_mongodb_url: process.env.TEST_MONGODB_URI,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    environment_check: process.env.NODE_ENV
};

export {config}