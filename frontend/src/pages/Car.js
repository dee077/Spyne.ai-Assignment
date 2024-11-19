import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DOMAIN, CLOUDINARY_URL } from "../utils/constants";
import Carousel from "../components/Carousel";
import Spinner from "../components/Spinner";
import useCar from "../hooks/useCar";

const CarDetails = () => {
  const { id } = useParams();
  const {carDetail, isLoading, fetchCarDetails} = useCar();


  // Fetch car details
  useEffect(() => {
    fetchCarDetails(id);
  }, []);

  if (isLoading) {
    <div className="mx-auto flex items-center justify-center my-10">
      <Spinner />
    </div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">{carDetail?.title}</h1>

      {/* Carousel */}
      <Carousel
        images={carDetail?.images?.map((image) => `${CLOUDINARY_URL}/${image}`)}
      />

      <div className="mt-6 mb-6 mx-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Car Details</h2>

        {/* Name Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Car Title
          </h3>
          <p className="text-gray-600 leading-relaxed">{carDetail?.title}</p>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{carDetail?.description}</p>
        </div>

        {/* Tags Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {carDetail?.tags && carDetail?.tags[0] && JSON.parse(carDetail?.tags[0]).map((tag, index) => (
              <span
                key={index}
                className="bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Timestamps Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Timestamps
          </h3>
          <p className="text-sm text-gray-500">
            <strong className="text-gray-700">Created At:</strong>{" "}
            {new Date(carDetail?.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            <strong className="text-gray-700">Updated At:</strong>{" "}
            {new Date(carDetail?.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
