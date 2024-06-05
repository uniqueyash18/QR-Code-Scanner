

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

export const getLocationName = async (latitude:number, longitude:number) => {
  try {
    const url = `${NOMINATIM_URL}?format=json&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const address = data.display_name; // Use display_name for a more complete address
      console.log('Location name:', address);
      return data;
    } else {
      console.error('Error fetching location name:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting location name:', error);
    return null;
  }
};