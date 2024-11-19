const Car=require('../models/Car')

const verifyOwnership = async (req, res, next) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car || car.createdBy.toString() !== req.user._id) {
        return res.status(403).json({ message: "You are not authorized to modify this car" });
      }
      next();
    } catch (error) {
      console.error("Error verifying ownership:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
module.exports = { verifyOwnership }