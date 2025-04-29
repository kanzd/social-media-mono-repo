import express from 'express';
import {
    createSetting,
    getSetting,
    updateSetting,
    deleteSetting
} from "../Controllers/UserSettingsController.js";

const router = express.Router();

router.post('/', createSetting);
router.get('/:id', getSetting);
router.put('/:id', updateSetting);
router.delete('/:id', deleteSetting);

export default router;
