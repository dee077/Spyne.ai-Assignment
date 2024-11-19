const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong, please try again.",
    });
  };
  
  module.exports = errorHandler;
  