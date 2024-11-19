import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useCar from '../hooks/useCar';
import useUser from '../hooks/useUser';
import { Search } from '../utils/icons';
import CarModal from '../components/CarModal';

const UserCars = () => {
  const { userCars, isLoading, fetchUserCars, fetchFilteredCars, addUserCar} = useCar();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardId, setCardId] = useState(null)
  const { user } = useUser()

  const openModal = () => {
    setCardId(null)
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const { id } = useParams();


  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() === '') {
        fetchUserCars(id);
      } else {
        fetchFilteredCars(id ,searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, fetchUserCars, fetchFilteredCars]);

  // Fetch cars data from API
  useEffect(() => {
    fetchUserCars(id)
  }, [addUserCar]);


  return (
    <div className="container mx-auto p-4 mb-10">
      <h1 className="text-4xl font-bold my-10 text-center">Cars owned by {user.name}</h1>
      <div className="flex justify-center mb-8">
        <div className="relative w-1/3">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search from user owned cars..."
            className="w-full pl-10 px-4 py-2 border rounded-md shadow-md focus:ring-black focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div
          className="w-1/6 cursor-pointer shadow-lg p-4 flex justify-center items-center rounded-md transition-transform transform hover:scale-105"
          onClick={openModal}
        >
          <div className="text-center">
            <span className="text-6xl font-bold">+</span>
            <p className="mt-2 text-sm">Add Car</p>
          </div>
        </div>
      </div>
      <CarModal isOpen={isModalOpen} onClose={closeModal} cardId={cardId} />
      {isLoading ? (
        <div className='mx-auto flex items-center justify-center my-10'>
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 mx-10">
          {userCars?.map((car) => (
            <Link key={car._id} to={`/car/${car._id}`}>
              <CarCard key={car._id} car={car} showActions={true} setIsModalOpen={setIsModalOpen} setCardId={setCardId} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCars;
