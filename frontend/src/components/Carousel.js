import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '../utils/icons';


const Carousel = ({ images }) => {
  const scrollContainerRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleScroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = current.offsetWidth * 0.5;
      current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateButtonState = () => {
    const { current } = scrollContainerRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setIsPrevDisabled(scrollLeft <= 0);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const { current } = scrollContainerRef;
    if (current) {
      updateButtonState();
      current.addEventListener('scroll', updateButtonState);
      return () => {
        current.removeEventListener('scroll', updateButtonState);
      };
    }
  }, [images]);

  return (
    <div className="mx-10">
      <div className="relative">
      <div className='flex items-center mx-5 my-1'>
          <button
            onClick={() => handleScroll('prev')}
            className={`text-xl mx-2 text-gray-800 bg-gray-300 bg-opacity-50 px-2 py-1 rounded-full transition duration-300  hover:bg-slate-200 shadow-lg ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className={`text-xl mx-2 text-gray-800 bg-gray-300 bg-opacity-50 px-2 py-1 rounded-full transition duration-300 hover:bg-slate-200 shadow-lg ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-black cursor-pointer'}`}
          >
            <ArrowRight />
          </button>
        </div>

        {/* Images Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll no-scrollbar space-x-4 p-4"
        >
          {images?.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-64 rounded-lg shadow-lg"
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
