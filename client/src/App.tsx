import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import CreateRecipe from './pages/CreateRecipe';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import User from './pages/User';
import Layout from './components/Layout';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>{isAuthenticated ? <Home /> : <Navigate to="/login" />}</Layout>} />
        <Route path="/recipe/:id" element={<Layout>{isAuthenticated ? <Recipe /> : <Navigate to="/login" />}</Layout>} />
        <Route path="/create" element={<Layout>{isAuthenticated ? <CreateRecipe /> : <Navigate to="/login" />}</Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/users" element={<Layout>{isAuthenticated ? <Users /> : <Navigate to="/login" />}</Layout>} />
        <Route path="/user/:id" element={<Layout>{isAuthenticated ? <User /> : <Navigate to="/login" />}</Layout>} />
      </Routes>
    </Router>
  );
};

export default App;