import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

const server = express();

const config = {
  port: process.env.PORT || 8080,
};

server.use((cors()));
server.use(bodyparser.json());

server.listen(config.port, () => {
  console.log('Express server listening on port', config.port);
});

// export { server };
