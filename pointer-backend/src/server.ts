import express, {Request, Response, NextFunction} from 'express';
import issuesRoutes from './routes/issue.router';
import { json } from 'body-parser';
import { connectToCouchbase } from './dao/issue.dao';
import { Cluster } from 'couchbase';

const PORT = 8080;

export let couchbaseConnection:Promise<Cluster>;
couchbaseConnection = connectToCouchbase();
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

app.listen(PORT);

//Listen port
console.log(`Running on port ${PORT}`);