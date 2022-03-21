import { NextFunction, RequestHandler } from 'express';
import { connectToCouchbase, upsertIssueFromDb, getIssueFromDb, deleteIssueFromDb, replaceIssueInDb } from '../dao/issue.dao';
import { Issue } from '../models/issue.model';
import { Cluster, MutationResult } from 'couchbase';
import { randomUUID } from 'crypto'
import { couchbaseConnection } from '../server';

type IssueWithoutId = Omit<Issue, "id">;

export const createIssue: RequestHandler = (req, res, next) => {
    const text = (req.body as IssueWithoutId ).text; 
    if (text !== undefined) {
        const id = randomUUID();
        const newIssue = new Issue(id, text);

        upsertIssueFromDb(couchbaseConnection, newIssue).then(mutationResult => {
            res.status(201).json({message: 'Issue created successfully', createdIssue: newIssue});
        }).catch(reason => {
            res.status(500).json({ message: reason });
        })
    } else {
        res.status(400).json({message: "Bad Request"})
    }
}

export const getIssue: RequestHandler<{id: String}> = (req, res, next) => {
    const issueId:string = String(req.params.id);
    getIssueFromDb(couchbaseConnection, issueId).then(getResult => {
        res.status(200).json((getResult.content as Issue));
    }).catch(reason => {
        if (reason?.name === "DocumentNotFoundError") {
            res.status(404).json({message: "Issue not found"})
        } else {
            res.status(500).json({message: reason})
        }
    });
}

export const replaceIssue:  RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = String(req.params.id);
    const updatedText = (req.body as IssueWithoutId).text;
    replaceIssueInDb(couchbaseConnection, new Issue(issueId, updatedText)).then(mutationResult => {
        res.status(200).json({message: "Updated successfully"});
    }).catch(reason => {
        if (reason?.name === "DocumentNotFoundError") {
            res.status(404).json({message: "Issue not found"})
        } else {
            res.status(500).json({message: reason});
        }
    });
}

export const updateIssue:  RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = String(req.params.id);
    const updatedText = (req.body as IssueWithoutId).text;
    getIssueFromDb(couchbaseConnection, issueId).then(getResult => {
        replaceIssueInDb(couchbaseConnection, new Issue(issueId, updatedText)).then(mutationResult => {
            res.status(200).json({message: "Updated successfully"});
        })
    }).catch(reason => {
        if (reason?.name === "DocumentNotFoundError") {
            res.status(404).json({message: "Issue not found"})
        } else {
            res.status(500).json({message: reason});
        }
    });
}

export const deleteIssue:  RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = String(req.params.id);
    deleteIssueFromDb(couchbaseConnection, issueId).then(mutationResult => {
        res.status(200).json({message: "Deleted successfully"});
    }).catch(reason => {
        if (reason?.name === "DocumentNotFoundError") {
            res.status(404).json({message: "Issue not found"});
        } else {
            res.status(500).json({message: reason});
        }
    })
}
