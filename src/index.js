import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
    origin: ['http://localhost', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use("/activity/documents", express.static(path.join(__dirname, '../activity/documents')));
app.use("/activity/images", express.static(path.join(__dirname, "../activity/images")));
app.use("/contents", express.static(path.join(__dirname, "../contents")));
app.use("/transaction/images", express.static(path.join(__dirname, "../transaction/images")));
app.use('/archive/documents', express.static(path.join(__dirname, '../archive/documents')));
app.use('/archive/templates', express.static(path.join(__dirname, '../archive/templates')));
app.use('/donations/images', express.static(path.join(__dirname, '../donations/images')));

app.options('*', cors());

app.use(web);

const port = process.env.PORT;

app.use((err, req, res, next) => {
    console.error('Uncaught error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(port, () => {
    logger.info(`App start on Port ${port}`);
});
