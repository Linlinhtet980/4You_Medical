import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages & Layout
import Layout from './components/Layout/Main_layout_Wrapper/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import Clients from './pages/Clients/Clients';
import Orders from './pages/Orders/Orders';
import Settings from './pages/Settings/Settings';

// A simple wrapper to protect routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  // If user is NOT logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the requested component
  return children;
};

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="clients" element={<Clients />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
