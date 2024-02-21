import { ApolloServer } from 'apollo-server-express';
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import express from 'express';
import cors from 'cors';
import typeDefs from './graphql/typeDefs/typeDefs.js';
import resolvers from './graphql/resolvers/resolver.js';

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    cache: 'bounded',
  });

  await server.start();
  server.applyMiddleware({ app });
};

app.listen(6060, () =>
  console.log(
    'Hosted url is -> http://localhost:6060/graphql, web -> https://graphql-js-hazel.vercel.app/graphql',
  ),
);

startApolloServer(app, httpServer);

const server = new ApolloServerLambda({
  typeDefs,
  resolvers,
  introspection: true,
  cache: 'bounded',
});

const handler = server.createHandler({ cors: { origin: '*' } } as any);

export default handler;
