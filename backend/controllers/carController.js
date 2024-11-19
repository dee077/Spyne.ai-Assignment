const Car = require("../models/Car");
const cloudinary = require("cloudinary").v2;
// Create Car
const createCar = async (req, res) => {
  try {
    if (req.files.length > 10) {
      return res.status(400).json({
        message: "No more than 10 images are allowed",
      });
    }
    const { title, description, tags } = req.body;
    const images = req.files;
    const imageIds = await Promise.all(
      images.map(async (image) => {
        const uploadResult = await cloudinary.uploader.upload(image.path);
        return uploadResult.public_id;
      })
    );

    const newCar = new Car({
      title,
      description,
      tags,
      images: imageIds, 
      createdBy: req.user._id,
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created successfully",
      car: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating car",
      error: error.message,
    });
  }
};

// Get User's Cars
const getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ createdBy: req.user._id });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search Cars
const searchCars = async (req, res) => {
  const { query, id } = req.query;
  
  try {
    let filter = { $or: [
      { title: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { tags: new RegExp(query, "i") },
    ]};

    // If an id is provided, search for cars created by that user
    if (id) {
      filter.createdBy = id;
    } else {
      filter.createdBy = req.user._id; // Default to current user's cars if no id is provided
    }

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    console.error("Error searching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Car Details
const getCarDetails = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Car
const updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files;

    let imageIds = [];
    if (images && images.length > 0) {
      imageIds = await Promise.all(
        images.map(async (image) => {
          const uploadResult = await cloudinary.uploader.upload(image.path);
          return uploadResult.public_id;
        })
      );
    }

    // Find the car by ID
    const car = await Car.findById(req.params.id);
    if (!car || car.createdBy.toString() !== req.user._id) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update only the fields that are present in the request body
    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;
    if (imageIds.length > 0) car.images = imageIds;

    // Save the updated car document
    await car.save();

    res.json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Car
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    // Check if the car exists and is owned by the authenticated user
    if (!car || car.createdBy.toString() !== req.user._id) {
      return res.status(404).json({ message: "Car not found" });
    }
    await Car.deleteOne({ _id: car._id });

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCars = async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find(); // Add filters if needed
    res.json({ message: "Cars fetched successfully", cars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error while fetching cars" });
  }
};

const searchUserCars = async (req, res) => {

}

module.exports = {
  createCar,
  getUserCars,
  searchCars,
  getCarDetails,
  updateCar,
  deleteCar,
  getAllCars,
  searchUserCars
};
