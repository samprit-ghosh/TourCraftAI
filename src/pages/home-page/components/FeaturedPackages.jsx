import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const FeaturedPackages = ({ packages, isLoading, onPackageClick }) => {
  const PackageSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="h-48 sm:h-64 bg-gray-200 animate-pulse" />
      <div className="p-4 sm:p-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
        </div>
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  const navigate = useNavigate(); 

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Featured Tour Packages
          </h2>
          <p className="text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto text-sm xs:text-sm sm:text-base">
            Discover our handpicked tour packages with high-quality imagery and competitive pricing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {isLoading
            ? Array.from({ length: 4 })?.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PackageSkeleton />
                </motion.div>
              ))
            : packages?.map((pkg, index) => (
                <motion.div
                  key={pkg?.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-full"
                >
                  <div className="relative">
                    <img
                      src={pkg?.image}
                      alt={pkg?.title}
                      className="w-full h-48 sm:h-64 object-cover"
                      loading="lazy"
                    />
                    {pkg?.isPopular && (
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        Popular
                      </div>
                    )}
                    {pkg?.discount && (
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {pkg?.discount}% OFF
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/70 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm flex items-center gap-1">
                      <Icon name="Clock" size={12} className="inline" />
                      {pkg?.duration} Days
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-base xs:text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2 line-clamp-2">
                      {pkg?.title}
                    </h3>
                    <p className="text-xs xs:text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2">
                      {pkg?.description}
                    </p>

                    {pkg?.highlights && (
                      <div className="mb-2 sm:mb-4">
                        <div className="flex flex-wrap gap-1">
                          {pkg?.highlights?.slice(0, 2)?.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="text-xs xs:text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                            >
                              {highlight}
                            </span>
                          ))}
                          {pkg?.highlights?.length > 2 && (
                            <span className="text-xs xs:text-[10px] text-primary">
                              +{pkg?.highlights?.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center mb-2 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs xs:text-[10px] font-medium">{pkg?.rating}</span>
                      </div>
                      <span className="text-xs xs:text-[10px] text-muted-foreground ml-2">
                        ({pkg?.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2 sm:mb-4 text-sm xs:text-xs">
                      <div>
                        {pkg?.originalPrice && (
                          <span className="text-xs xs:text-[10px] text-muted-foreground line-through">
                            {formatPrice(pkg?.originalPrice)}
                          </span>
                        )}
                        <div className="text-base xs:text-sm font-bold text-primary">
                          {formatPrice(pkg?.price)}
                        </div>
                        <span className="text-xs xs:text-[10px] text-muted-foreground">per person</span>
                      </div>
                    </div>

                    {/* <Button
                      onClick={() => onPackageClick?.(pkg?.id)}
                      fullWidth
                      size="sm"
                      iconName="Eye"
                      className="text-xs sm:text-sm"
                    >
                      Quick View
                    </Button> */}
                  </div>
                </motion.div>
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="sm"
            className="px-4 xs:px-6 sm:px-8 text-xs sm:text-sm "
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate("/tour-package-discovery")}
          >
            View All Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
