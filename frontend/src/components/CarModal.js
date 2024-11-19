import React, { useState } from "react";
import Spinner from "./Spinner";
import useCar from "../hooks/useCar";

const CarModal = ({ isOpen, onClose, cardId }) => {
  const { isLoading, addUserCar, editUserCar} = useCar();
  const [title, setTitle] = useState("Test");
  const [description, setDescription] = useState("Test");
  const [tags, setTags] = useState("tag1,tag2,tag3");
  const [images, setImages] = useState([]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedTags = JSON.stringify(tags.split(",").map((tag) => tag.trim()));
    // console.log(images)
    if(!cardId) await addUserCar({title, description, tags: formattedTags, images})
    else await editUserCar(cardId, {title, description, tags: formattedTags, images})
    onClose();
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-7 text-2xl font-semibold px-2 py-1 rounded-md shadow-md text-gray-600 hover:bg-gray-50"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center">{cardId ? 'Edit': 'Add'} Car</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter car title"
              className="w-full p-2 border rounded focus:ring-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter full car description"
              className="w-full p-2 border rounded focus:ring-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block mb-1 font-medium">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              placeholder="Add tags Separated by ,"
              className="w-full p-2 border rounded focus:ring-black"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="carPictures" className="block mb-1 font-medium">
              Car Pictures (Files Limit: 10, Size Limit: 5MB)
            </label>
            <input
              id="carPictures"
              type="file"
              className="w-full p-2 border rounded"
              multiple
              onChange={(e) => {setImages(Array.from(e.target.files))}}
            />
          </div>
          <div className="mb-4">
            {isLoading ? (
              <Spinner color="black" />
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded active:scale-95 transition duration-300
                transform hover:scale-105 will-change-transform"
              >
                {cardId ? 'Edit': 'Add'} Car
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;
