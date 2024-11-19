import { useCallback, useState } from "react";
import { DOMAIN } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCars,
  setCarDetail,
  setUserCars,
} from "../redux/slices/carSlice";
import { showToast } from "../utils/toastConfig";

const useCar = () => {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.car.allCars);
  const userCars = useSelector((state) => state.car.userCars);
  const carDetail = useSelector((state) => state.car.carDetail);
  const [isLoading, setIsLoading] = useState(false);

  // Function to set user data in Redux store
  const setAllCarsData = (cars) => {
    dispatch(setAllCars(cars));
  };

  const setUserCarsData = (cars) => {
    dispatch(setUserCars(cars));
  };

  const setCarDetails = (cars) => {
    dispatch(setCarDetail(cars));
  };

  // Fetch all cars
  const fetchAllCars = useCallback( async () => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // console.log("All Cars", data);
      if (data.cars) {
        setAllCarsData(data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars data:", error);
    } finally {
      setIsLoading(false);
    }
  },[]);

  const fetchUserCars = useCallback( async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserCarsData(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch details of a specific car
  const fetchCarDetails = useCallback( async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // console.log("Car Details", data);
      setCarDetails(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFilteredCars = useCallback( async (id='', query) => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/search?query=${query}&id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllCarsData(data);
      if(id) setUserCarsData(data)
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addUserCar = useCallback( async (carData) => {
    const token = sessionStorage.getItem("jwtToken");
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);
    carData.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json(); 
      showToast(data.message);
      fetchUserCars()
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editUserCar = useCallback( async (id,carData) => {
    const token = sessionStorage.getItem("jwtToken");
    const formData = new FormData();
    if(carData.title) formData.append("title", carData.title);
    if(carData.description) formData.append("description", carData.description);
    if(carData.tags) formData.append("tags", carData.tags);
    if(carData.images.length) carData.images.forEach((image, index) => {formData.append(`images`, image)});
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      showToast(data.message);
      fetchUserCars()
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUserCar = useCallback( async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    setIsLoading(true);
    try {
      const response = await fetch(`${DOMAIN}/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      showToast(data.message);
      fetchUserCars()
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  return {
    allCars,
    userCars,
    carDetail,
    isLoading,
    fetchAllCars,
    fetchCarDetails,
    fetchUserCars,
    fetchFilteredCars,
    addUserCar,
    editUserCar,
    deleteUserCar,
  };
};

export default useCar;
