import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Car from '../pages/Car';
import UserCars from '../pages/UserCars'
// import CarDetails from '../pages/CarDetails';
// import CreateCar from '../pages/CreateCar';
// import UpdateCar from '../pages/UpdateCar';
// import UserCars from '../pages/UserCars';

const appRoutes = [
  { path: '/login', element: <Auth />, isProtected: false },
  { path: '/', element: <Home />, isProtected: true },
  { path: '/car/:id', element: <Car/>, isProtected: true },
  { path: '/user-cars/:id', element: <UserCars />, isProtected: true },
//   { path: '/create-car', element: <CreateCar />, isProtected: true },
//   { path: '/update-car/:id', element: <UpdateCar />, isProtected: true },
];

export default appRoutes;
