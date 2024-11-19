import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import appRoutes from './routes/appRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
// import Footer from './components/Footer';
// import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          {appRoutes.map(({ path, element, isProtected }, index) => (
            <Route
              key={index}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
            />
          ))}
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        {/* <Footer /> */}
        <ToastContainer />
      </Router>
    </Provider>
  );
};

export default App;
