import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useCar from '../hooks/useCar';
import { Search } from '../utils/icons';

const Home = () => {
  const { allCars, isLoading, fetchAllCars, fetchFilteredCars } = useCar();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() === '') {
        fetchAllCars();
      } else {
        fetchFilteredCars(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, fetchAllCars, fetchFilteredCars]);

  // Fetch cars data from API
  useEffect(() => {
    fetchAllCars()
  }, [fetchAllCars]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-10 text-center">Welcome to Car Management App</h1>
      <div className="flex justify-center mb-8">
        <div className="relative w-1/3">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search from all cars..."
            className="w-full pl-10 px-4 py-2 border rounded-md shadow-md focus:ring-black focus:outline-none"
          />
        </div>
      </div>
      {isLoading ? (
        <div className='mx-auto flex items-center justify-center my-10'>
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-5 mx-10">
          {allCars.map((car) => (
            <Link key={car._id} to={`/car/${car._id}`}>
              <CarCard key={car._id} car={car} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
