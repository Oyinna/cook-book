import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import {config} from './config';
import {router} from './routes'

const server = express();

server.use((cors()));
server.use(bodyparser.json());
server.use('/', router)

server.listen(config.port, () => {
  console.log('Express server listening on port', config.port);
});

// export { server };
