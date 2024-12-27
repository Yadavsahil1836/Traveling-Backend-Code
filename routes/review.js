import express from 'express'
import { createReview } from '../controllers/reviewController.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

// Typically, you might want to ensure a user is logged in to leave a review
router.post('/:tourId', verifyToken, createReview)

export default router
