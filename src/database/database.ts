import "reflect-metadata"

import { DataSource } from 'typeorm';
import { User } from '../entity/User.js';
import { RefreshToken } from "../entity/RefreshToken.js";
import { Item } from "../entity/Item.js";


export const AppDataSource = new DataSource({
    type: "postgres",
    username: process.env.DB_USER || 'postgres',
    synchronize: true,
    database: process.env.DB_NAME!,
    logging: true,
    entities: [User, RefreshToken, Item],
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 5432
})

try{
    await AppDataSource.initialize() //встановлюємо початкове(перше) з'єдання з базою даних
    console.log("Data Source was successfully initialized")
}catch(err){
    console.error("An error during Data Source initialization occured: " + err)
}


// export async function query<T extends QueryResultRow>(text: string, params?: unknown[]): Promise<T[]> {
//     const result = await pool.query<T>(text, params)
//     return result.rows
// }

