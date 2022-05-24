import { Router} from 'express'
import { handleUpdatePlayer, handleCreatePlayer, handleGetPlayer } from '../controllers/player.async.controller';

const router = Router();
router.get('/player/:playerUid', handleGetPlayer);
router.post('/player', handleCreatePlayer);
router.patch('/player/:playerUid', handleUpdatePlayer);
export default router;