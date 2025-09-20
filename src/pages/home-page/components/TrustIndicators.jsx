import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const stats = [
    {
      icon: 'Users',
      value: '50,000+',
      label: 'Happy Travelers',
      color: 'text-blue-600'
    },
    {
      icon: 'MapPin',
      value: '500+',
      label: 'Tour Packages',
      color: 'text-green-600'
    },
    {
      icon: 'Star',
      value: '4.8/5',
      label: 'Average Rating',
      color: 'text-yellow-600'
    },
    {
      icon: 'Shield',
      value: '100%',
      label: 'Secure Booking',
      color: 'text-purple-600'
    }
  ];

  const reviews = [
    {
      rating: 5,
      text: 'Excellent service and amazing tour packages. Highly recommended!',
      author: 'Amit Verma',
      location: 'Pune',
      date: '2 days ago'
    },
    {
      rating: 5,
      text: 'Professional team, great prices, and unforgettable experiences.',
      author: 'Sneha Patel',
      location: 'Ahmedabad',
      date: '1 week ago'
    },
    {
      rating: 4,
      text: 'Good organization and value for money. Will book again!',
      author: 'Rohit Singh',
      location: 'Jaipur',
      date: '2 weeks ago'
    }
  ];

  const securityBadges = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is protected'
    },
    {
      icon: 'CreditCard',
      title: 'Safe Payments',
      description: 'Multiple payment options'
    },
    {
      icon: 'HeadphonesIcon',
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: 'Award',
      title: 'Certified',
      description: 'Industry certified agency'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Trust Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of satisfied travelers who have chosen us for their perfect vacation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                  <Icon name={stat?.icon} size={28} className={stat?.color} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat?.value}
                </div>
                <div className="text-muted-foreground">
                  {stat?.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="MessageSquare" size={24} className="mr-3 text-primary" />
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {reviews?.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1 mr-3">
                      {Array.from({ length: review?.rating })?.map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review?.date}
                    </span>
                  </div>
                  <p className="text-foreground mb-3">
                    "{review?.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {review?.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review?.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="ShieldCheck" size={24} className="mr-3 text-primary" />
              Security & Trust
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {securityBadges?.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-sm transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                    <Icon name={badge?.icon} size={20} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {badge?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {badge?.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Booking Statistics */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Recent Booking Activity
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last 24 hours:</span>
                  <span className="font-semibold text-foreground">47 bookings</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">This week:</span>
                  <span className="font-semibold text-foreground">312 bookings</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">This month:</span>
                  <span className="font-semibold text-foreground">1,247 bookings</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-primary">
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  <span>95% customer satisfaction rate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;