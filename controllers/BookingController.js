import Booking from '../models/Booking.js'

// CREATE NEW BOOKING
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body)
    const savedBooking = await newBooking.save()

    return res.status(200).json({
      success: true,
      message: 'Your tour is booked!',
      data: savedBooking
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// GET SINGLE BOOKING
export const getBooking = async (req, res) => {
  const { id } = req.params

  try {
    const book = await Booking.findById(id)
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Booking found',
      data: book
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// GET ALL BOOKINGS
export const getAllBooking = async (req, res) => {
  try {
    // To get all bookings, call find() with an empty object or no arguments
    const books = await Booking.find()

    return res.status(200).json({
      success: true,
      message: 'Bookings found',
      data: books
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
