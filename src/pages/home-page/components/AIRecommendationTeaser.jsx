import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIRecommendationTeaser = ({ onGetRecommendations }) => {
  const features = [
    {
      icon: 'Brain',
      title: 'Smart Matching',
      description: 'AI analyzes your preferences to find perfect destinations'
    },
    {
      icon: 'Sparkles',
      title: 'Gemini API Powered',
      description: 'Advanced AI technology for personalized recommendations'
    },
    {
      icon: 'Target',
      title: 'Personalized Results',
      description: 'Get tours tailored to your budget, duration, and interests'
    }
  ];

  const testimonials = [

    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'Amazing experience! AI suggested a Rajasthan tour that exceeded all expectations.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    },
    {
      name: 'Anita Desai',
      location: 'Bangalore',
      rating: 5,
      text: 'The AI understood my love for hill stations perfectly. Kerala tour was incredible!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="Sparkles" size={16} className="mr-2" />
            AI-Powered Recommendations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let AI Find Your Perfect Tour
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our unique Gemini API integration with animated graphics and discover tours that match your exact preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* AI Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={feature?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {feature?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={onGetRecommendations}
                className="px-8"
                iconName="Zap"
              >
                Get AI Recommendations
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Graphics & Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* AI Animation Graphic */}
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                >
                  <Icon name="Brain" size={40} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  AI Processing Your Preferences
                </h3>
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2]?.map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                What Our Users Say:
              </h3>
              {testimonials?.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">
                          {testimonial?.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          from {testimonial?.location}
                        </span>
                        <div className="flex">
                          {Array.from({ length: testimonial?.rating })?.map((_, i) => (
                            <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "{testimonial?.text}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendationTeaser;