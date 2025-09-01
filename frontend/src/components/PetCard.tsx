import { Link } from 'react-router-dom';
import { Pet } from '../types';
import { MapPin, Calendar, User } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
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
    // Placeholder images based on species
    const images = {
      dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop',
      rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop',
      hamster: 'https://images.unsplash.com/photo-1584553421349-3557477bed79?w=400&h=300&fit=crop',
      fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=300&fit=crop',
      other: 'https://images.unsplash.com/photo-1543852786-1cf6624b998d?w=400&h=300&fit=crop'
    };
    return pet.image_url || images[species as keyof typeof images] || images.other;
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={getPetImage(pet.species)}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`status-badge ${getStatusColor(pet.status)}`}>
            {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {pet.name}
          </h3>
          <span className="text-sm text-gray-500 capitalize">
            {pet.species}
          </span>
        </div>
        
        {pet.breed && (
          <p className="text-gray-600 mb-2">
            {pet.breed}
          </p>
        )}
        
        {pet.age && (
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{pet.age} year{pet.age !== 1 ? 's' : ''} old</span>
          </div>
        )}
        
        {pet.location && (
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{pet.location}</span>
          </div>
        )}
        
        {pet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {pet.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>{pet.owner}</span>
          </div>
          
          <Link
            to={`/pets/${pet.id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
