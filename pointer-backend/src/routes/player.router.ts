import { Router} from 'express'
import { handleUpdatePlayer, handleCreatePlayer, handleGetPlayer } from '../controllers/player.async.controller';

const router = Router();
router.get('/:playerUid', handleGetPlayer);
router.post('/', handleCreatePlayer);
router.patch('/:playerUid', handleUpdatePlayer);
export default router;