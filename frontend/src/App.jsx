import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useContext } from 'react';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);
  if (!user || !user.id) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container" style={{padding:20}}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
