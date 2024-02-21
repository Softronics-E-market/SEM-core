import { ApolloServer } from 'apollo-server-micro';
import typeDefs from './graphql/typeDefs/typeDefs';
import resolvers from './graphql/resolvers/resolver';
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    cache: 'bounded',
});
try {
    server.start();
}
catch (error) {
    console.log("error : ", error);
}
export default server.createHandler({ path: "/api/graphql" });
//# sourceMappingURL=index.js.map