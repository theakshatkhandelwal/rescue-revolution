import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { PawPrint, Upload, X } from 'lucide-react';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    image_url: '',
    location: '',
    contact_info: '',
    status: 'available'
  });
  const [loading, setLoading] = useState(false);
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  const speciesOptions = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'other'];
  const statusOptions = ['available', 'adopted', 'lost'];

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
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null
        }),
      });

      if (response.ok) {
        showToast('Pet added successfully!', 'success');
        navigate('/dashboard');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add pet');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to add pet', 'error');
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
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center">
            <PawPrint className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add a Pet
          </h1>
          <p className="text-gray-600">
            Help a pet find their forever home by adding them to our platform
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter pet's name"
                />
              </div>

              <div>
                <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-2">
                  Species *
                </label>
                <select
                  id="species"
                  name="species"
                  required
                  value={formData.species}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select species</option>
                  {speciesOptions.map((species) => (
                    <option key={species} value={species}>
                      {species.charAt(0).toUpperCase() + species.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
                  Breed
                </label>
                <input
                  id="breed"
                  name="breed"
                  type="text"
                  value={formData.breed}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter breed (optional)"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                placeholder="Tell us about the pet's personality, health, and any special needs..."
              />
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="https://example.com/pet-image.jpg"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Provide a direct link to the pet's photo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="City, State"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <input
                id="contact_info"
                name="contact_info"
                type="text"
                value={formData.contact_info}
                onChange={handleChange}
                className="input-field"
                placeholder="Phone number or email for inquiries"
              />
              <p className="mt-1 text-xs text-gray-500">
                This will be visible to potential adopters
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Pet...' : 'Add Pet'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
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

export default AddPet;
