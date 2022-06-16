import { Router} from 'express'
import { handleDeleteEstimates } from '../controllers/room.async.controller';

const router = Router();
router.delete('/:roomId/estimates', handleDeleteEstimates);
export default router;