import Tour from '../models/Tour.js'

// CREATE new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body)

  try {
    const savedTour = await newTour.save()
    return res.status(200).json({
      success: true,
      message: 'Successfully created',
      data: savedTour
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to create. Try again.'
    })
  }
}

// UPDATE tour
export const updateTour = async (req, res) => {
  const { id } = req.params

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedTour
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to update'
    })
  }
}

// DELETE tour
export const deleteTour = async (req, res) => {
  const { id } = req.params

  try {
    const deletedTour = await Tour.findByIdAndDelete(id)

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully deleted'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete'
    })
  }
}

// GET single tour
export const getSingleTour = async (req, res) => {
  const { id } = req.params

  try {
    const tour = await Tour.findById(id).populate('reviews')
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully found',
      data: tour
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// GET all tours (with pagination)
export const getAllTour = async (req, res) => {
  try {
    // If no page is provided, default to 0 (first page)
    const page = parseInt(req.query.page) || 0
    const limit = 8

    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * limit)
      .limit(limit)

    return res.status(200).json({
      success: true,
      count: tours.length,
      message: 'Successfully found all',
      data: tours
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch tours'
    })
  }
}

// GET tours by search
export const getTourBySearch = async (req, res) => {
  try {
    // The 'i' in RegExp means case-insensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance) || 0
    const maxGroupSize = parseInt(req.query.maxGroupSize) || 0

    // NOTE: If you want tours *within* a distance, you might use `$lte` instead of `$gte`
    // For now, we keep your existing logic:
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize }
    }).populate('reviews')

    if (!tours.length) {
      return res.status(404).json({
        success: false,
        message: 'No result found',
        data: []
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully found tours',
      data: tours
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// GET featured tours (limit 8)
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate('reviews')
      .limit(8)

    // You could do a check here if no tours are found, but returning an empty array with 200 is also valid
    return res.status(200).json({
      success: true,
      message: 'Featured tours found',
      data: tours
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'No data found'
    })
  }
}

// GET tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount()
    return res.status(200).json({ success: true, data: tourCount })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch tour count'
    })
  }
}
