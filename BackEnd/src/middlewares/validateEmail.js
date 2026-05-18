export function validateEmailInBody(fieldName = 'email') {
  return (req, res, next) => {
    const value = req.body?.[fieldName]

    if (value === undefined || value === null || value === '') {
      return next()
    }

    const email = String(value).trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'El correo no tiene un formato valido.' })
    }

    req.body[fieldName] = email
    return next()
  }
}
