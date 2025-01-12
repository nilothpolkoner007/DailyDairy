import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './lib/api/pages/Login';
import { Register } from './lib/api/pages/Register';
import { Dashboard } from './lib/api/pages/Dashboard';
import { Tasks } from './lib/api/pages/Tasks'; // Corrected import path
import { Diary } from './lib/api/pages/Diary'; // Corrected import path
import { Photos } from './lib/api/pages/Photos';
import Profile from './lib/api/pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='diary' element={<Diary />} />
            <Route path='photos' element={<Photos />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
