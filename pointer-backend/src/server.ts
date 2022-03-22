import express, {Request, Response, NextFunction} from 'express';
import issuesRoutes from './routes/issue.router';
import { json } from 'body-parser';
import { connectToCouchbase } from './dao/issue.dao';
import { Cluster } from 'couchbase';
import { WebSocket, WebSocketServer } from 'ws';
import http, { createServer } from 'http';

const PORT = 8080;

export let couchbaseConnection:Promise<Cluster> = connectToCouchbase();

//Create an app
const app = express();

// use json middleware from body-parser
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world\n');
});

app.use('/issue', issuesRoutes);

// Below route is triggered when any error is is thrown
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

const server = createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', function (ws, request) {
    
    ws.on('message', function (message) {
       
        console.log(`Received message ${message} `);
    });
    
    ws.on('close', function () {
        //   map.delete(userId);
    });
});

server.listen(PORT);

//Listen port
console.log(`HTTP and WebSocket Server Running on port ${PORT}`);

// WebSocket Server
// const wss = new WebSocketServer({ port: 8081 });

// wss.on('connection', function connection(ws) {
    //   ws.on('message', function message(data) {
        //     console.log('received: %s', data);
        //   });
        
        //   ws.send('something');
        // });

// See this for eventual Rest->WS upgrade https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js