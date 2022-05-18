import express, {Request, Response, NextFunction} from 'express';
import roomRoutes from './routes/room.router';
import { json } from 'body-parser';
import { createServer, IncomingMessage } from 'http';
import { Duplex } from 'stream';
import { manageRoom } from './controllers/room.sync.controller';
import { Room } from './models/room.model';
import { Player } from './models/player';

const PORT = 8080;

export const rooms: Map<string, Room> = new Map<string, Room>();
export const players: Map<string, Player> = new Map<string, Player>();

// export let couchbaseConnection:Promise<Cluster> = connectToCouchbase();

//Create an app
const app = express();
const server = createServer(app);

// use json middleware from body-parser
app.use(json());

app.use('/api/room', roomRoutes);

// Below route is triggered when any error is is thrown
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({healthy: true});
});

const wss = manageRoom();

server.on('upgrade', function upgrade(request: IncomingMessage, socket: Duplex, head: Buffer): void {
    console.log(`upgrading...`)
    if (request !== undefined) {
        if (request.url === '/socket') {
            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    }
  }
);

server.listen(PORT);

//Listen port
console.log(`HTTP and WebSocket Server Running on port ${PORT}`);

// See this for eventual Rest->WS upgrade https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js