import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, PawPrint, AlertTriangle, Users, Home, Phone, Mail } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: PawPrint,
      title: 'Pet Adoption',
      description: 'Find loving homes for abandoned and rescued pets in your area.',
      color: 'primary'
    },
    {
      icon: AlertTriangle,
      title: 'Lost & Found',
      description: 'Report lost pets and help reunite them with their families.',
      color: 'warning'
    },
    {
      icon: Heart,
      title: 'Incident Reporting',
      description: 'Report animal abuse, emergencies, and welfare concerns.',
      color: 'danger'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with other pet lovers and rescue organizations.',
      color: 'secondary'
    }
  ];

  const stats = [
    { number: '500+', label: 'Pets Adopted' },
    { number: '200+', label: 'Lost Pets Found' },
    { number: '50+', label: 'Incidents Resolved' },
    { number: '1000+', label: 'Community Members' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            🐾 Rescue Revolution
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connecting pet lovers with animals in need. Find homes for abandoned pets, 
            report lost pets, and help animals in distress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pets"
              className="btn-primary text-lg px-8 py-3"
            >
              Browse Pets
            </Link>
            <Link
              to="/incidents"
              className="btn-secondary text-lg px-8 py-3"
            >
              View Incidents
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Help Animals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive tools to support animal welfare and 
            connect pets with loving families.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-16 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Together, we've made a difference in the lives of countless animals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-br from-success-50 to-primary-50 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every pet deserves a loving home. Join our community and help make a difference 
            in the lives of animals in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3"
            >
              Get Started
            </Link>
            <Link
              to="/pets"
              className="btn-outline text-lg px-8 py-3"
            >
              Browse Available Pets
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions or need assistance? We're here to help!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">support@rescuerevolution.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary-600" />
              <span className="text-gray-600">1-800-RESCUE</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
