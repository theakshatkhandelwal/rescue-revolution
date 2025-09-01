import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pet } from '../types';
import { MapPin, Calendar, User, Phone, Mail, ArrowLeft } from 'lucide-react';

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const response = await fetch(`/api/pets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPet(data);
      }
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'adopted':
        return 'status-adopted';
      case 'lost':
        return 'status-lost';
      default:
        return 'status-available';
    }
  };

  const getPetImage = (species: string) => {
    const images = {
      dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
      bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=400&fit=crop',
      rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop',
      hamster: 'https://images.unsplash.com/photo-1584553421349-3557477bed79?w=600&h=400&fit=crop',
      fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&h=400&fit=crop',
      other: 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=600&h=400&fit=crop'
    };
    return pet?.image_url || images[species as keyof typeof images] || images.other;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h2>
        <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist or has been removed.</p>
        <Link to="/pets" className="btn-primary">
          Browse All Pets
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
          to="/pets"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pets
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div>
            <img
              src={getPetImage(pet.species)}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Pet Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {pet.name}
                </h1>
                <span className={`status-badge ${getStatusColor(pet.status)}`}>
                  {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </span>
              </div>
              <p className="text-lg text-gray-600 capitalize">
                {pet.species} {pet.breed && `• ${pet.breed}`}
              </p>
            </div>

            {/* Pet Details */}
            <div className="space-y-4">
              {pet.age && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{pet.age} year{pet.age !== 1 ? 's' : ''} old</span>
                </div>
              )}

              {pet.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{pet.location}</span>
                </div>
              )}

              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-3" />
                <span>Listed by {pet.owner}</span>
              </div>
            </div>

            {/* Description */}
            {pet.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About {pet.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {pet.description}
                </p>
              </div>
            )}

            {/* Contact Information */}
            {pet.contact_info && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{pet.contact_info}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {pet.status === 'available' && (
                <button className="w-full btn-primary py-3 text-lg">
                  Contact About Adoption
                </button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline py-3">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                <button className="btn-outline py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Owner
                </button>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Listed:</span>
                  <p className="text-gray-600">
                    {new Date(pet.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Species:</span>
                  <p className="text-gray-600 capitalize">{pet.species}</p>
                </div>
                {pet.breed && (
                  <div>
                    <span className="font-medium text-gray-700">Breed:</span>
                    <p className="text-gray-600">{pet.breed}</p>
                  </div>
                )}
                {pet.age && (
                  <div>
                    <span className="font-medium text-gray-700">Age:</span>
                    <p className="text-gray-600">{pet.age} year{pet.age !== 1 ? 's' : ''} old</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Pets Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Pets</h2>
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              Looking for more pets like {pet.name}?
            </p>
            <Link to="/pets" className="btn-primary">
              Browse All Pets
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PetDetail;
