import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Pet, Incident } from '../types';
import { Plus, PawPrint, AlertTriangle, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [userIncidents, setUserIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's pets and incidents
      const [petsResponse, incidentsResponse] = await Promise.all([
        fetch('/api/pets'),
        fetch('/api/incidents')
      ]);

      if (petsResponse.ok) {
        const pets = await petsResponse.json();
        setUserPets(pets.filter((pet: Pet) => pet.owner === user?.username));
      }

      if (incidentsResponse.ok) {
        const incidents = await incidentsResponse.json();
        setUserIncidents(incidents.filter((incident: Incident) => incident.reporter === user?.username));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'My Pets',
      value: userPets.length,
      icon: PawPrint,
      color: 'primary'
    },
    {
      title: 'My Reports',
      value: userIncidents.length,
      icon: AlertTriangle,
      color: 'warning'
    },
    {
      title: 'Available Pets',
      value: userPets.filter(pet => pet.status === 'available').length,
      icon: PawPrint,
      color: 'success'
    },
    {
      title: 'Active Reports',
      value: userIncidents.filter(incident => incident.status === 'open').length,
      icon: AlertTriangle,
      color: 'danger'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}! 🐾
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your pets and reports
          </p>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card text-center"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.title}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/add-pet"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <Plus className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add a Pet</h3>
              <p className="text-sm text-gray-600">List a pet for adoption</p>
            </div>
          </Link>
          
          <Link
            to="/add-incident"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-warning-300 hover:bg-warning-50 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Report Incident</h3>
              <p className="text-sm text-gray-600">Report lost pet or welfare concern</p>
            </div>
          </Link>
        </div>
      </div>

      {/* My Pets */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            My Pets
          </h2>
          <Link to="/add-pet" className="btn-primary text-sm">
            Add Pet
          </Link>
        </div>
        
        {userPets.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pets yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start by adding a pet to your profile.
            </p>
            <Link to="/add-pet" className="btn-primary">
              Add Your First Pet
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPets.slice(0, 6).map((pet) => (
              <div key={pet.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{pet.name}</h3>
                  <span className={`status-badge ${pet.status === 'available' ? 'status-available' : pet.status === 'adopted' ? 'status-adopted' : 'status-lost'}`}>
                    {pet.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pet.species} • {pet.breed || 'Unknown breed'}</p>
                {pet.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {pet.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            My Reports
          </h2>
          <Link to="/add-incident" className="btn-primary text-sm">
            Report Incident
          </Link>
        </div>
        
        {userIncidents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports yet
            </h3>
            <p className="text-gray-600 mb-4">
              Report incidents to help animals in need.
            </p>
            <Link to="/add-incident" className="btn-primary">
              Report Incident
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userIncidents.slice(0, 5).map((incident) => (
              <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{incident.title}</h3>
                  <span className={`status-badge ${incident.status === 'open' ? 'status-open' : incident.status === 'resolved' ? 'status-resolved' : 'status-closed'}`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="capitalize">{incident.incident_type.replace('_', ' ')}</span>
                  <span>{new Date(incident.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
