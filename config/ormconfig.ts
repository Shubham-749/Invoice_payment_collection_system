
import { DataSource } from "typeorm";
import { User } from "../src/entities/User";
import { Invoice } from "../src/entities/Invoice";
import { Transaction } from "../src/entities/Transaction";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "shubhampaliwal",
    password: "admin",
    database: "postgres",
    synchronize: true,
    entities: [User, Invoice, Transaction]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
export default AppDataSource;