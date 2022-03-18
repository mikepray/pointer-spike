import { NextFunction, RequestHandler } from 'express';
import { Issue } from '../models/issue';
const ISSUES: Issue[] = [];
type IssueWithoutId = Omit<Issue, "id">;

export const createIssue: RequestHandler = (req, res, next) => {
    const text = (req.body as IssueWithoutId ).text; 
    if (text !== undefined) {
        const id = String(ISSUES.length);
        const newIssue = new Issue(id, text);
        ISSUES.push(newIssue);
        res.status(201).json({message: 'Issue created successfully', createdIssue: newIssue});
    } else {
        res.status(400).json({message: "Bad Request"})
    }
};

export const getIssues: RequestHandler = (req, res, next) => {
    res.status(200).json(ISSUES);
}

export const getIssue: RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = req.params.id;
    const issueIndex = ISSUES.findIndex(element => element.id === issueId);
    if (issueIndex > 0) {
        res.status(200).json(ISSUES[issueIndex]);
    } else {
        res.status(404).json({message:"Could not find issue"})
    }
}

export const updateIssue:  RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = req.params.id;
    const updatedText = (req.body as IssueWithoutId).text
    const issueIndex = ISSUES.findIndex(element => element.id === issueId);
    if (issueIndex > 0) {
        ISSUES[issueIndex].text = updatedText;
        res.status(200).json({message: "Updated successfully"})
    } else {
        res.status(404).json({message:"Could not find issue"})
    }
}

export const deleteIssue:  RequestHandler<{id: String}> = (req, res, next) => {
    const issueId = req.params.id;
    const issueIndex = ISSUES.findIndex(element => element.id === issueId);
    if (issueIndex > 0) {
        ISSUES.splice(issueIndex);
        res.status(200).json({message: "Deleted successfully"})
    } else {
        res.status(404).json({message:"Could not find issue"})
    }

}
