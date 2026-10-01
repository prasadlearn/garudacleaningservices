import { useState } from 'react';

export function useLocation() {
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');
  const [gpsLocation, setGpsLocation] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>('');

  const requestUserLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setGpsLocation(mapsLink);
        setDeliveryLocation(mapsLink);
        setIsDetecting(false);
      },
      (error) => {
        console.warn('Location detection declined or failed:', error.message);
        setIsDetecting(false);
        setLocationError('Could not detect location. Please type your area or paste Google Maps pin.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // one-shot, do not continuously track
      }
    );
  };

  const clearLocation = () => {
    setDeliveryLocation('');
    setGpsLocation('');
    setLocationError('');
  };

  return {
    deliveryLocation,
    setDeliveryLocation,
    gpsLocation,
    setGpsLocation,
    isDetecting,
    locationError,
    requestUserLocation,
    clearLocation
  };
}

