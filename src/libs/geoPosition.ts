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

export function GetAddress (data: any) {
    try {
        if (!data || !data.results || !data.results[0]) {
            return new Error("Invalid data format or missing address information");
        }

        const address = data.results[0].formatted;
        return address;
    } catch (error: any) {
        return new Error(error.message);
    }
}