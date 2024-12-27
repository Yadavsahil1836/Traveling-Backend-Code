import express from 'express'
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser
} from '../controllers/userController.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// Only user themselves or admin can do these:
router.get('/:id', verifyToken, verifyUser, getSingleUser)
router.put('/:id', verifyToken, verifyUser, updateUser)
router.delete('/:id', verifyToken, verifyUser, deleteUser)

// Only admin can do these:
router.get('/', verifyToken, verifyAdmin, getAllUser)

export default router
