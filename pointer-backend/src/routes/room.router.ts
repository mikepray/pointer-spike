import { Router} from 'express'
import { deleteEstimates, updateRoomPlayer } from '../controllers/room.async.controller';
import cors from 'cors';

const router = Router();
router.options("*", cors);
router.patch('/:roomId/player/:playerUid', cors, updateRoomPlayer);
router.delete('/:roomId/estimates', cors, deleteEstimates);
export default router;