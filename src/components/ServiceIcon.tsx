import React from 'react';
import {
  Home,
  Building2,
  Sparkles,
  DoorOpen,
  LogOut,
  UtensilsCrossed,
  Bath,
  Sofa,
  BedDouble,
  Layers,
  Grid3X3,
  Droplets,
  HardHat,
  AppWindow,
  Scan,
  Fan,
  Briefcase,
  Store,
  GraduationCap,
  Hotel,
  Building,
  CheckCircle2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Building2,
  Sparkles,
  DoorOpen,
  LogOut,
  UtensilsCrossed,
  Bath,
  Sofa,
  BedDouble,
  Layers,
  Grid3X3,
  Droplets,
  HardHat,
  AppWindow,
  Scan,
  Fan,
  Briefcase,
  Store,
  GraduationCap,
  Hotel,
  Building,
  CheckCircle2,
  // Slugs mapping as fallbacks
  'bhk-deep-cleaning': Home,
  'villa-deep-cleaning': Building2,
  'full-home-deep-cleaning-package': Sparkles,
  'move-in-cleaning': DoorOpen,
  'move-out-cleaning': LogOut,
  'kitchen-deep-cleaning': UtensilsCrossed,
  'bathroom-deep-cleaning': Bath,
  'sofa-cleaning': Sofa,
  'mattress-cleaning': BedDouble,
  'carpet-cleaning': Layers,
  'floor-deep-cleaning': Grid3X3,
  'water-tank-cleaning': Droplets,
  'post-construction-cleaning': HardHat,
  'window-cleaning': AppWindow,
  'glass-cleaning': Scan,
  'fan-cleaning': Fan,
  'office-deep-cleaning': Briefcase,
  'shop-cleaning': Store,
  'school-classroom-cleaning': GraduationCap,
  'hotel-guest-house-cleaning': Hotel,
  'commercial-cleaning': Building,
};

interface ServiceIconProps {
  name?: string;
  slug?: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, slug, className = 'w-6 h-6' }) => {
  const IconComponent = (name && ICON_MAP[name]) || (slug && ICON_MAP[slug]) || Sparkles;
  return <IconComponent className={className} />;
};
