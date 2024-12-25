import jsonAddon from './middleware/json';
import path from 'path';
import dotenv from 'dotenv';
import { loadRoutes } from './utils/routeLoader';
import { Request, Response } from './types';

dotenv.config();

const server = require('http').createServer((req: Request, res: Response) => {
    jsonAddon(req, res, () => {
            loadRoutes(path.join(__dirname, 'routes'), req, res);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
