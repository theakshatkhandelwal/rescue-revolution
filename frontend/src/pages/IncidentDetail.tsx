import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Incident } from '../types';
import { MapPin, Calendar, User, Phone, AlertTriangle, ArrowLeft } from 'lucide-react';

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const fetchIncident = async () => {
    try {
      const response = await fetch(`/api/incidents/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIncident(data);
      }
    } catch (error) {
      console.error('Error fetching incident:', error);
    } finally {
      setLoading(false);
    }
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lost_pet':
        return 'Lost Pet';
      case 'found_pet':
        return 'Found Pet';
      case 'abuse':
        return 'Animal Abuse';
      case 'emergency':
        return 'Emergency';
      default:
        return 'Other';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Incident Not Found</h2>
        <p className="text-gray-600 mb-6">The incident you're looking for doesn't exist or has been removed.</p>
        <Link to="/incidents" className="btn-primary">
          Browse All Incidents
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link
          to="/incidents"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Incidents
        </Link>

        <div className="card">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getTypeIcon(incident.incident_type)}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {incident.title}
                </h1>
                <p className="text-gray-600">
                  Reported by {incident.reporter} • {new Date(incident.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className={`status-badge ${getStatusColor(incident.status)}`}>
              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
            </span>
          </div>

          {/* Incident Type Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {getTypeLabel(incident.incident_type)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {incident.description}
            </p>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{incident.location}</span>
            </div>
          </div>

          {/* Contact Information */}
          {incident.contact_info && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{incident.contact_info}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full btn-primary py-3 text-lg">
              Contact Reporter
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-outline py-3">
                <Phone className="w-4 h-4 mr-2" />
                Call Reporter
              </button>
              <button className="btn-outline py-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Update
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Reported:</span>
                <p className="text-gray-600">
                  {new Date(incident.created_at).toLocaleDateString()} at {new Date(incident.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <p className="text-gray-600 capitalize">
                  {incident.incident_type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p className="text-gray-600 capitalize">{incident.status}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Reporter:</span>
                <p className="text-gray-600">{incident.reporter}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Incidents */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Incidents</h2>
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              Looking for more incidents in this area?
            </p>
            <Link to="/incidents" className="btn-primary">
              Browse All Incidents
            </Link>
          </div>
        </div>

        {/* Emergency Information */}
        {incident.incident_type === 'abuse' || incident.incident_type === 'emergency' ? (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Emergency Contact Information
                </h3>
                <p className="text-red-800 mb-3">
                  If this is an urgent situation requiring immediate attention, please contact local authorities:
                </p>
                <ul className="text-red-800 space-y-1 text-sm">
                  <li>• Local Animal Control: 911 or your local emergency number</li>
                  <li>• ASPCA Animal Poison Control: (888) 426-4435</li>
                  <li>• Local Humane Society or SPCA</li>
                  <li>• Local Police Department</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default IncidentDetail;
