import React, { useState } from "react";
import { CLOUDINARY_URL } from "../utils/constants";
import { Delete, Edit } from "../utils/icons";
import useCar from "../hooks/useCar";


const CarCard = ({ car, showActions = false, setIsModalOpen, setCardId }) => {
  const {deleteUserCar} = useCar()
  
  const openModal = (e, id) => {
    e.preventDefault(); 
    setCardId(id)
    setIsModalOpen(true);
  };
  
  const deleteHandler = (e, id) => {
    e.preventDefault();
    deleteUserCar(id)
  }
  
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 w-64 cursor-pointer hover:shadow-lg 
    transition-transform transform hover:scale-105"
    >
      <img
        src={`${CLOUDINARY_URL}/${car.images[0]}`} // Replace with actual image path
        alt={car.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="px-1 font-semibold text-lg mb-2">{car.title}</h2>
      <p className="px-2 text-sm text-gray-600 mb-4 line-clamp-1">
        {car.description}
      </p>
      <div
        className="flex flex-wrap gap-2 px-1 overflow-hidden text-ellipsis whitespace-nowrap"
        title={JSON.parse(car.tags[0]).join(", ")} // Optional: show full tags on hover
      >
        {JSON.parse(car.tags[0])
          .slice(0, 3)
          .map((tag, index) => (
            <span
              key={index}
              className="bg-cyan-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
      </div>
      {showActions && (
        <div className="flex justify-between items-center mt-4">
          <button
            className="ml-1 flex items-center bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
            title="Edit"
            onClick={(e) => openModal(e, car._id)}
          >
          <Edit/>
            Edit
          </button>
          <button
            className="mr-3 flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            title="Delete"
            onClick={(e) => deleteHandler(e, car._id)}
          >
            <Delete/>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCard;
