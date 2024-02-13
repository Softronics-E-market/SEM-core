import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import typeDefs from "../src/typeDefs/typeDefs.js";
import resolvers from "../src/resolvers/resolver.js";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

app.listen(6060, () =>
  console.log(
    "Hosted url is -> http://localhost:6060/graphql, web -> https://graphql-js-hazel.vercel.app/graphql"
  )
);

startApolloServer(app, httpServer);

export default httpServer;
