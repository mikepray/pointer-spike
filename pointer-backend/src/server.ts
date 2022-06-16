import express, {Request, Response, NextFunction} from 'express';
import roomRoutes from './routes/room.router';
import playerRoutes from './routes/player.router';
import { json } from 'body-parser';
import { createServer, IncomingMessage } from 'http';
import { initializeWebsocketServer } from './controllers/room.sync.controller';
import cookieParser from "cookie-parser";

const PORT = 8080;

// export let couchbaseConnection:Promise<Cluster> = connectToCouchbase();

//Create an app
const app = express();
const server = createServer(app);

// use json middleware from body-parser
app.use(json());
app.use(cookieParser());

app.use('/api/room', roomRoutes);
app.use('/api/player', playerRoutes)

// Below route is triggered when any error is is thrown
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({healthy: true});
});

initializeWebsocketServer(server);

server.listen(PORT);

//Listen port
console.log(`HTTP and WebSocket Server Running on port ${PORT}`);

// See this for eventual Rest->WS upgrade https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js