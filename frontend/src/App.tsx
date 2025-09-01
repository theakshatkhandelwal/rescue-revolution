import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pets from './pages/Pets';
import Incidents from './pages/Incidents';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PetDetail from './pages/PetDetail';
import IncidentDetail from './pages/IncidentDetail';
import AddPet from './pages/AddPet';
import AddIncident from './pages/AddIncident';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/pets/:id" element={<PetDetail />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/incidents/:id" element={<IncidentDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-pet" 
                  element={
                    <ProtectedRoute>
                      <AddPet />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-incident" 
                  element={
                    <ProtectedRoute>
                      <AddIncident />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
