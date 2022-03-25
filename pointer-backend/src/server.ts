import express, {Request, Response, NextFunction} from 'express';
import issuesRoutes from './routes/issue.router';
import { json } from 'body-parser';
import { connectToCouchbase } from './dao/issue.dao';
import { Cluster } from 'couchbase';
import { RawData, WebSocketServer } from 'ws';
import { createServer, IncomingMessage } from 'http';
import { parse } from 'url';
import internal, { Duplex } from 'stream';
import { manageRoom } from './controllers/room.controller';

const PORT = 8080;

export let couchbaseConnection:Promise<Cluster> = connectToCouchbase();

//Create an app
const app = express();
const server = createServer(app);

// use json middleware from body-parser
app.use(json());
app.use('/issue', issuesRoutes);

// Below route is triggered when any error is is thrown
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world\n');
});

const wss = manageRoom();

server.on('upgrade', function upgrade(request: IncomingMessage, socket: Duplex, head: Buffer): void {
    console.log('upgrading...')
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


// // WebSocket Server
//  const wss = new WebSocketServer({ port: 8080 });

//  wss.on('connection', function connection(ws) {
//        ws.on('message', function message(data) {
//             console.log('received: %s', data);
//           });
        
//           ws.send('something');
//         });

// See this for eventual Rest->WS upgrade https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js