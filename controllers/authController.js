import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// USER REGISTRATION
export const register = async (req, res) => {
  try {
    // 1) Hash password (use async instead of sync for non-blocking)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    // 2) Create a new user instance
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo
    })

    // 3) Save user to database
    await newUser.save()

    // 4) Respond success
    res
      .status(200)
      .json({ success: true, message: 'User registered successfully.' })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: 'Failed to create user. Try again.' })
  }
}

// USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1) Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })
    }

    // 2) Compare incoming password with the hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect email or password.' })
    }

    // 3) Create a JWT token (set an expiration period)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    )

    // 4) Remove password from the response
    const { password: _, role, ...rest } = user._doc

    // 5) Set token in a cookie
    // NOTE: expiresIn on token doesn't automatically set the cookie expiration.
    //       We must manually set cookie maxAge or expires.
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days in ms
    })

    // 6) Send response to client
    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      role,
      data: rest
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: 'Failed to log in. Try again.' })
  }
}
