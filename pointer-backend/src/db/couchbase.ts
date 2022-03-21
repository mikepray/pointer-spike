import {
    Bucket,
    Cluster,
    Collection,
    connect,
    GetResult,
    MutationResult,
  } from 'couchbase'
import { Issue } from '../models/issue';
  
export function connectToCouchbase(): Promise<Cluster> {
    return connect("couchbase://localhost", 
    {
      "username": "Administrator",
      "password": "blackboard",
    });
}

export function upsertIssueFromDb(clusterPromise: Promise<Cluster>, issue: Issue): Promise<MutationResult> {
    const key: string = issue.id;
   
    return clusterPromise.then(cluster => {
        const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
        return collection.upsert(key, issue)
    });
}

export function replaceIssueInDb(clusterPromise: Promise<Cluster>, issue: Issue): Promise<MutationResult> {
    const key: string = issue.id;
   
    return clusterPromise.then(cluster => {
        const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
        return collection.replace(key, issue)
    });
}

export function getIssueFromDb(clusterPromise: Promise<Cluster>, issueId: string): Promise<GetResult> {
    return clusterPromise.then(cluster => {
        const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
        return collection.get(issueId)
    });
}

export function deleteIssueFromDb(clusterPromise: Promise<Cluster>, issueId: string) {
    return clusterPromise.then(cluster => {
        const collection: Collection = cluster.bucket("pointer").scope("_default").collection("issues");
        return collection.remove(issueId)
    });
}
