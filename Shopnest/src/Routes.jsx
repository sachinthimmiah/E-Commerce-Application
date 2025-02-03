import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import CustomerHomePage from './CustomerHomePage';
import CartPage from './CartPage';
import Orders from './Orders';
import UserProfile from './UserProfile'
import AdminDashboard from './AdminDashboard';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/customerhome" element={<CustomerHomePage />} />
      <Route path="/CartPage" element={<CartPage />} />
      <Route path="/orders" element={<Orders />} />
       <Route path="/profile" element={<UserProfile/>} />
       <Route path="/admin" element={<LoginPage/>} />
       <Route path="/admindashboard" element={<AdminDashboard/>} />
    </Routes>
  );
};

export default AppRoutes;
