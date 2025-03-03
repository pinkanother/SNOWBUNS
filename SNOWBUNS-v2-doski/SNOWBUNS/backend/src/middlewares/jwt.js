const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return apiResponse.ErrorResponse(res, "Unauthorized: No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Invalid token");
  }
};