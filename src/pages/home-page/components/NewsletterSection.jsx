import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  const travelTips = [
    {
      icon: 'Plane',
      title: 'Flight Deals',
      description: 'Get notified about exclusive flight discounts and offers'
    },
    {
      icon: 'MapPin',
      title: 'New Destinations',
      description: 'Be the first to know about our latest tour packages'
    },
    {
      icon: 'Calendar',
      title: 'Travel Calendar',
      description: 'Seasonal travel tips and best time to visit guides'
    },
    {
      icon: 'Camera',
      title: 'Travel Stories',
      description: 'Inspiring travel stories and photography tips'
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🎉 Welcome to TourCraft Family!
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you for subscribing! You'll receive the best travel deals, tips, and stories directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                iconName="Compass"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Discover Tours Now
              </Button>
              <Button
                variant="outline"
                iconName="Gift"
              >
                View Welcome Offer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Icon name="Mail" size={16} className="mr-2" />
              Stay Updated
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Travel Tips & Exclusive Deals
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of travelers who receive our weekly newsletter with the best travel tips, 
              destination guides, exclusive offers, and inspiring stories.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  loading={isLoading}
                  className="px-8"
                  iconName="Send"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            </form>

            <div className="text-sm text-muted-foreground">
              <p className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2 text-success" />
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>

          {/* What You'll Get */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              What You'll Receive:
            </h3>
            
            <div className="space-y-4">
              {travelTips?.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={tip?.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {tip?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tip?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    25,000+ Subscribers
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Join our travel community
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-${i === 1 ? '1494790108755-2616b612b47c' : i === 2 ? '1507003211169-0a1dd7228f2d' : i === 3 ? '1438761681033-6461ffad8d80' : '1472099645785-5658abf4ff4e'}?w=32&h=32&fit=crop&crop=face)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;