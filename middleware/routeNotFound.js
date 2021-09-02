const routeNotFound = (req, res) => {
  res.json({ success: false, message: "invalid route" })
}

module.exports = { routeNotFound };