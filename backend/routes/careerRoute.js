import express from 'express';
import {
  createCareer,
  getCareers,
  getCareer,
  updateCareer,
  deleteCareer
} from '../controllers/careerController.js';

const router = express.Router();

router.post('/create', createCareer);
router.get('/', getCareers);
router.get('/:id', getCareer);
router.put('/update/:id', updateCareer);
router.delete('/delete/:id', deleteCareer);

export default router;
