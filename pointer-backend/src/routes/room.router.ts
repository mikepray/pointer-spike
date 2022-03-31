import { Router} from 'express'
import { deleteEstimates, updateRoomPlayer } from '../controllers/room.async.controller';
import cors from 'cors';

const router = Router();
router.patch('/:roomId/player/:playerUid', updateRoomPlayer);
router.delete('/:roomId/estimates', deleteEstimates);
export default router;