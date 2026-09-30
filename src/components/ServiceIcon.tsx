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
  Droplets,
  HardHat,
  AppWindow,
  Scan,
  Fan,
  Briefcase,
  Store,
  GraduationCap,
  Hotel,
  ShieldCheck,
  CheckCircle2,
  Grid3X3,
  Building
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
  ShieldCheck,
  CheckCircle2,
  // Slugs mapping as fallbacks
  'home-cleaning': Home,
  'bhk-deep-cleaning': Home,
  'villa-cleaning': Building2,
  'villa-deep-cleaning': Building2,
  'move-in-out-cleaning': DoorOpen,
  'move-in-cleaning': DoorOpen,
  'move-out-cleaning': LogOut,
  'kitchen-cleaning': UtensilsCrossed,
  'kitchen-deep-cleaning': UtensilsCrossed,
  'washroom-cleaning': Bath,
  'bathroom-deep-cleaning': Bath,
  'sofa-cleaning': Sofa,
  'mattress-cleaning': BedDouble,
  'carpet-cleaning': Layers,
  'fridge-cleaning': Sparkles,
  'pest-control': ShieldCheck,
  'water-tank-cleaning': Droplets,
  'post-construction-cleaning': HardHat,
  'window-cleaning': AppWindow,
  'glass-cleaning': Scan,
  'fan-cleaning': Fan,
  'office-cleaning': Briefcase,
  'office-deep-cleaning': Briefcase,
  'shop-cleaning': Store,
  'school-classroom-cleaning': GraduationCap,
  'hotel-guest-house-cleaning': Hotel,
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
