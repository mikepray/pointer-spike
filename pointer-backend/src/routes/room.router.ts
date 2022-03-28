import { Router} from 'express'
import { updateRoom } from '../controllers/room.async.controller';

const router = Router();
router.patch('/:roomId', updateRoom);
export default router;