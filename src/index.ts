import * as admin from 'firebase-admin';
import resolvers from './resolvers/index';
import typeDefs from './typeDefs/index';
import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Logger } from './plugins/logging.plugin';

const logger = new Logger();

// config({ path: resolve(__dirname, "../.env") });
// const serviceAccount = require('../service-account.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  logger.log({
    action: 'Server start',
    message: `Server ready at ${url}`,
  });
});
