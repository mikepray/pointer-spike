import { Router} from 'express'
import { handleAddPlayerToRoom, handleDeleteEstimates } from '../controllers/room.async.controller';

const router = Router();
router.delete('/:roomId/estimates', handleDeleteEstimates);
router.patch('/:roomId/player/:playerUid', handleAddPlayerToRoom);
export default router;