import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Incident } from '../types';

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (typeFilter) params.append('type', typeFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/search/incidents?${params}`);
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchIncidents();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('');
    setStatusFilter('');
    fetchIncidents();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-open';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lost_pet':
        return '🐕';
      case 'found_pet':
        return '🏠';
      case 'abuse':
        return '🚨';
      case 'emergency':
        return '⚡';
      default:
        return '📋';
    }
  };

  const typeOptions = ['lost_pet', 'found_pet', 'abuse', 'emergency'];
  const statusOptions = ['open', 'resolved', 'closed'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Community Incidents
          </h1>
          <p className="text-gray-600">
            Stay informed about lost pets, found animals, and welfare concerns in your area
          </p>
        </div>
        {user && (
          <Link
            to="/add-incident"
            className="btn-warning flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Report Incident</span>
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Incidents
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or description..."
                className="input-field pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSearch}
            className="btn-primary flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button
            onClick={clearFilters}
            className="btn-outline flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {incidents.length} {incidents.length === 1 ? 'Incident' : 'Incidents'} Found
          </h2>
        </div>

        {incidents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No incidents found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new reports.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(incident.incident_type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {incident.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Reported by {incident.reporter} • {new Date(incident.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusColor(incident.status)}`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {incident.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="capitalize">
                      {incident.incident_type.replace('_', ' ')}
                    </span>
                    <span>📍 {incident.location}</span>
                  </div>
                  
                  <Link
                    to={`/incidents/${incident.id}`}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Incidents;
