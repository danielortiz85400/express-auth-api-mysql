import { createPool, Pool } from "mysql2/promise";
import { configPoolConnect } from "./envConfig";

export const pool: Pool = createPool(configPoolConnect)

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected BD 🚀🚀🚀");
    connection.release();
  })
  .catch((err) => {
    console.log("Error while connecting to the BD:", err);
  });
