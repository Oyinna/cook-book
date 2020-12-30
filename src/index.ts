import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import {config} from './config';
import {dbconnection} from './database/dbConnect';

const server = express();

server.use((cors()));
server.use(bodyparser.json());

server.listen(config.port, () => {
  console.log('Express server listening on port', config.port);
  dbconnection(<string>config.mogodb_url)
});

// export { server };
