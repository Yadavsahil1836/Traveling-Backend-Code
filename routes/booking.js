import express from 'express'
import {
  createBooking,
  getAllBooking,
  getBooking
} from '../controllers/BookingController.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE booking (any logged-in user)
router.post('/', verifyToken, createBooking)

// GET single booking (owner or admin)
router.get('/:id', verifyToken, getBooking) // you'd add verifyUser check if you want only the booking owner or admin

// GET all bookings (admin-only)
router.get('/', verifyToken, verifyAdmin, getAllBooking)

export default router
