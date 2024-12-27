import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err)
  }
}

// Middlewares
app.use(express.json()) // Allows parsing JSON in request bodies
app.use(cookieParser()) // Enables reading cookies from req.cookies
app.use(
  cors({
    origin: 'http://localhost:3000', // or your frontend URL
    credentials: true // so browser includes cookies
  })
)

// Import your routes
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import tourRoute from './routes/tour.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/booking.js'

// Mount routes on /api/v1 endpoints
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', bookingRoute)

// Start the server
app.listen(port, () => {
  connect()
  console.log(`Server is running on port ${port}`)
})
