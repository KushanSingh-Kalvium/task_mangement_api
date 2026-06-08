const errorHandler = (
  err,
  req,
  res,
  next
) => {

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      errors: err.issues
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message ||
      "Server Error"
  });
};

module.exports = errorHandler;