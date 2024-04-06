export async function ReverseGeocoding (latitude: string | number | null, longitude: string | number | null) {
    try {
      const requestOptions = {
        method: 'GET',
      };
  
      const REVERSEGEO_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${REVERSEGEO_API_KEY}`;
  
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