import { Router} from 'express'
import { createIssue, deleteIssue, getIssue, replaceIssue, updateIssue } from '../controllers/issue.controller';

const router = Router();
router.post('/', createIssue);
router.get('/:id', getIssue);
router.put('/:id', replaceIssue);
router.patch('/:id', updateIssue);
router.delete('/:id', deleteIssue);
export default router;