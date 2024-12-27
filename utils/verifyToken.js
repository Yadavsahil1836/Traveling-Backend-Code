import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided.' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid or expired token.' })
    }
    req.user = user
    next()
  })
}

// This ensures the user is either the same ID as the route param or has an 'admin' role
export const verifyUser = (req, res, next) => {
  const { id } = req.params // the user ID from the route
  if (req.user.id === id || req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ success: false, message: 'Forbidden.' })
  }
}

export const verifyAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ success: false, message: 'Admin only.' })
  }
}
