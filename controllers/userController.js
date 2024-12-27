import User from '../models/User.js'

// CREATE new user (typically you'd do this via Auth register, but here is a barebones approach)
export const createUser = async (req, res) => {
  const newUser = new User(req.body)

  try {
    const savedUser = await newUser.save()
    return res.status(200).json({
      success: true,
      message: 'User created successfully.',
      data: savedUser
    })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create user. Try again.' })
  }
}

// UPDATE user
export const updateUser = async (req, res) => {
  const { id } = req.params

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser
    })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update user.' })
  }
}

// DELETE user
export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })
    }

    return res
      .status(200)
      .json({ success: true, message: 'User deleted successfully.' })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete user.' })
  }
}

// GET single user
export const getSingleUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })
    }

    return res.status(200).json({
      success: true,
      message: 'User found.',
      data: user
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: 'Server error.' })
  }
}

// GET all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({})
    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: users
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: 'No data found.' })
  }
}
