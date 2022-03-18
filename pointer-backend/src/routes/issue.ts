import { Router} from 'express'
import { createIssue, deleteIssue, getIssue, getIssues, updateIssue } from '../controllers/issue';

const router = Router();
router.post('/', createIssue);
router.get('/', getIssues);
router.get('/:id', getIssue);
router.patch('/:id', updateIssue);
router.delete('/:id', deleteIssue);
export default router;