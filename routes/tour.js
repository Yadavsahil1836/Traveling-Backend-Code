import express from 'express'
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour
} from '../controllers/tourController.js'
import { verifyToken, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// Public routes
router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTours', getFeaturedTour)
router.get('/search/getTourCount', getTourCount)
router.get('/', getAllTour)
router.get('/:id', getSingleTour)

// Admin-only or restricted routes
router.post('/', verifyToken, verifyAdmin, createTour)
router.put('/:id', verifyToken, verifyAdmin, updateTour)
router.delete('/:id', verifyToken, verifyAdmin, deleteTour)

export default router
