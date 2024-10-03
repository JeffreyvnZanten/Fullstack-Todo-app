import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";
import dotenv from 'dotenv'

dotenv.config();

let dataSource: DataSource | null = null;

export const getDataSource = async (): Promise<DataSource> => {
    if (!dataSource) {
        dataSource = new DataSource({
            type: "mysql",
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT || '3306', 10),
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'test',
            entities: [Todo],
            synchronize: true,
            logging: ["error", "query", "schema"],
            connectTimeout: 60000,
        });

        await dataSource.initialize();
    }

    return dataSource;
};