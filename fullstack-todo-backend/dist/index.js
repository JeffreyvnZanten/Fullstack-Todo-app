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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const connection_1 = require("./connection");
const Consumption_1 = require("./Consumption");
const app = (0, express_1.default)();
dotenv_1.default.config({ path: path_1.default.resolve('./src', '../.env') });
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001'
}));
app.use(express_1.default.json());
app.get('/api/consumptions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataSource = yield (0, connection_1.getDataSource)();
        const consumptionRepository = dataSource.getRepository(Consumption_1.Consumption);
        const consumptions = yield consumptionRepository.find();
        res.json(consumptions);
    }
    catch (error) {
        console.error('Error fetching consumptions:', error);
        res.status(500).json({ message: 'Error fetching consumptions' });
    }
}));
app.post('/api/consumptions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        console.log('Received request with name:', name);
        const dataSource = yield (0, connection_1.getDataSource)();
        console.log('DataSource initialized');
        const consumptionRepository = dataSource.getRepository(Consumption_1.Consumption);
        const newConsumption = new Consumption_1.Consumption(name, new Date());
        console.log('Attempting to save consumption:', newConsumption);
        const savedConsumption = yield consumptionRepository.save(newConsumption);
        console.log('Consumption saved successfully:', savedConsumption);
        res.status(201).json(savedConsumption);
    }
    catch (error) {
        console.error('Detailed error in POST /api/consumptions:', error);
        res.status(500).json({
            message: 'Error creating consumption',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
    }
}));
// Initialize the DataSource before starting the server
(0, connection_1.getDataSource)().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => {
    console.error('Error during Data Source initialization', error);
});
