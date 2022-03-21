import {
    Bucket,
    Cluster,
    Collection,
    connect,
    GetResult,
    MutationResult,
  } from 'couchbase'
import { Issue } from '../models/issue.model';
  
export function connectToCouchbase(): Promise<Cluster> {
    return connect("couchbase://localhost", 
    {
      "username": "Administrator",
      "password": "blackboard",
    });
}

export async function upsertIssueFromDb(clusterPromise: Promise<Cluster>, issue: Issue): Promise<MutationResult> {
    const key: string = issue.id;
   
    const cluster = await clusterPromise;
    const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
    return await collection.upsert(key, issue);
}

export async function replaceIssueInDb(clusterPromise: Promise<Cluster>, issue: Issue): Promise<MutationResult> {
    const key: string = issue.id;
   
    const cluster = await clusterPromise;
    const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
    return await collection.replace(key, issue);
}

export async function getIssueFromDb(clusterPromise: Promise<Cluster>, issueId: string): Promise<GetResult> {
    const cluster = await clusterPromise;
    const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
    return await collection.get(issueId);
}

export async function deleteIssueFromDb(clusterPromise: Promise<Cluster>, issueId: string) {
    const cluster = await clusterPromise;
    const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
    return await collection.remove(issueId);
}
