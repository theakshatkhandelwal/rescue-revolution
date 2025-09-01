export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  description?: string;
  image_url?: string;
  status: 'available' | 'adopted' | 'lost';
  location?: string;
  contact_info?: string;
  created_at: string;
  owner: string;
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  location: string;
  incident_type: 'lost_pet' | 'found_pet' | 'abuse' | 'emergency';
  contact_info?: string;
  status: 'open' | 'resolved' | 'closed';
  created_at: string;
  reporter: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchFilters {
  q?: string;
  species?: string;
  status?: string;
  type?: string;
}
