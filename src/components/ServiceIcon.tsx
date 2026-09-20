import React from 'react';
import { Home, Utensils, Droplets, Sparkles, Building2, Shield, Bath, Armchair } from 'lucide-react';

interface ServiceIconProps {
  slug: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ slug, className = 'w-6 h-6' }) => {
  switch (slug) {
    case 'home-deep-cleaning':
      return <Home className={className} />;
    case 'kitchen-cleaning':
      return <Utensils className={className} />;
    case 'bathroom-cleaning':
      return <Bath className={className} />;
    case 'sofa-carpet-cleaning':
      return <Armchair className={className} />;
    case 'floor-scrubbing-polishing':
      return <Droplets className={className} />;
    case 'office-commercial-cleaning':
      return <Building2 className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
