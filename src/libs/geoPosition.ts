const GEO_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
const AryaKueWaypoint = {
  lat: '-6.3416248242940725',
  long: '107.1159700056869',
}
const { lat, long } = AryaKueWaypoint;

const requestOptions = {
  method: 'GET',
};

export async function ReverseGeocoding (latitude: string | number | null, longitude: string | number | null) {
  try {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${GEO_API_KEY}`;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(error.message); 
  }
}

export function GetAddress(data: any): string | null {
  try {
    if (!data || !data.results || !data.results[0]) {
      return null;
    } 
    const d = data.results[0];
    const address = `${d.road}, ${d.formatted}`;
    return address;
  } catch (error) {
    console.error("Error getting address:", error.message);
    return null;
  }
}

export async function RoutingLocation(userLocation: any) {

  if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
    console.log("Error: Invalid user location provided.");
    return null;
  }

  const { latitude, longitude } = userLocation;

  try {
    const url = `https://api.geoapify.com/v1/routing?waypoints=${lat},${long}|${latitude},${longitude}&mode=motorcycle&apiKey=${GEO_API_KEY}`;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting route waypoint:", error.message);
    return null;
  }

}

export function ShowDistanceInKilometer(distanceInMeters: number) {

  if (!distanceInMeters) {
    console.log("Error: Invalid distance provided.");
    return null;
  }

  const convertDistance = distanceInMeters / 1000;
  const formattedDistance = convertDistance.toFixed(1).replace(".", ",") + "km";
  return formattedDistance;
}

export function calculateShippingCost(distance: number) {

  const convertedDistance = distance / 1000;

  if (!convertedDistance) {
    console.log("Error: Invalid distance provided.");
    return null;
  }

  if (convertedDistance > 5 && convertedDistance <= 10) {
    return 10000;
  } else if (convertedDistance > 10 && convertedDistance <= 20) {
    return 15000;
  } else if (convertedDistance > 20 && convertedDistance <= 30) {
    return 20000;
  } else if (convertedDistance > 30) {
    return convertedDistance * 2000;
  } else {
    return 5000;
  }
}