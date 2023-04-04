import express from 'express';
import { createItem, updateItem, getItem, getItemByID, deleteItemById } from './itemController';

const router = express.Router();

router.get('/getitems', getItem);
router.get('/getitembyId/:id', getItemByID);
router.post('/items', createItem);
router.put('/updateitems/:id', updateItem);
router.delete('/delitems/:id', deleteItemById);

export default router;