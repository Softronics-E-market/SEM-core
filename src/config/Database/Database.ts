import Entities from "../../entities";
import { DataSource, Connection } from "typeorm";

let connection: Connection;

const dbConn = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  connection = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: Entities,
    schema: process.env.DB_SCHEMA
  });

  return await connection.initialize();
};

export default dbConn;
