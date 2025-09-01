import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Phone } from 'lucide-react';

const AddIncident = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    incident_type: '',
    contact_info: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  const incidentTypes = [
    { value: 'lost_pet', label: 'Lost Pet', description: 'Report a missing pet' },
    { value: 'found_pet', label: 'Found Pet', description: 'Report finding a pet' },
    { value: 'abuse', label: 'Animal Abuse', description: 'Report animal cruelty or neglect' },
    { value: 'emergency', label: 'Emergency', description: 'Report urgent animal welfare issue' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Incident reported successfully!', 'success');
        navigate('/incidents');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to report incident');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to report incident', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-warning-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report Incident
          </h1>
          <p className="text-gray-600">
            Help animals in need by reporting incidents in your community
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="incident_type" className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type *
              </label>
              <select
                id="incident_type"
                name="incident_type"
                required
                value={formData.incident_type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select incident type</option>
                {incidentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Brief description of the incident"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                placeholder="Provide detailed information about the incident, including any identifying features, circumstances, and relevant details..."
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Street address, city, or general area"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contact_info"
                  name="contact_info"
                  type="text"
                  value={formData.contact_info}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Phone number or email for follow-up"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                This will be visible to community members who can help
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Important Information
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• For lost pets: Include last seen location, time, and identifying features</li>
                <li>• For found pets: Include where found, condition, and any tags/collars</li>
                <li>• For abuse/emergency: Contact local authorities immediately</li>
                <li>• All reports are reviewed by our community moderators</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-warning py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Reporting...' : 'Report Incident'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/incidents')}
                className="btn-outline py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddIncident;
