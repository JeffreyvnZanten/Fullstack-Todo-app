"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = void 0;
const typeorm_1 = require("typeorm");
const Consumption_1 = require("./Consumption");
let dataSource = null;
const config_1 = require("./config");
// Use dbConfig instead of process.env
dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    username: config_1.dbConfig.username,
    password: config_1.dbConfig.password,
    database: config_1.dbConfig.database,
    entities: [Consumption_1.Consumption]
});
const getDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!dataSource) {
        dataSource = new typeorm_1.DataSource({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "3306"),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Consumption_1.Consumption],
            synchronize: true,
            logging: ["error", "query", "schema"],
        });
        yield dataSource.initialize();
    }
    return dataSource;
});
exports.getDataSource = getDataSource;
