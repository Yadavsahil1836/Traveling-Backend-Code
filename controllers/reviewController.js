import Tour from '../models/Tour.js'
import Review from '../models/Review.js'

export const createReview = async (req, res) => {
  const { tourId } = req.params

  try {
    // Optional: check if the referenced Tour exists
    const tour = await Tour.findById(tourId)
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found.' })
    }

    // 1) Create a new review document
    //    Pass in productId = tourId so the review references the correct Tour
    const newReview = new Review({
      productId: tourId, // <--- important fix
      ...req.body
    })

    // 2) Save the review
    const savedReview = await newReview.save()

    // 3) Push the review ID into the Tour's reviews array
    tour.reviews.push(savedReview._id)
    await tour.save()

    // 4) Return success response
    return res.status(200).json({
      success: true,
      message: 'Review submitted',
      data: savedReview
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Review not submitted'
    })
  }
}
