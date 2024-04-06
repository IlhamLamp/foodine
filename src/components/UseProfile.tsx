import { useEffect, useState } from "react";

interface ProfileData {
    admin: boolean;
}

const UseProfile = (): { data: ProfileData; loading: boolean} => {
    const [data, setData] = useState<ProfileData>({admin: false});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/dashboard/profile');
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response?.status}`);
                }
                const profileData = await response?.json();
                setData(profileData);
                console.log(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { data, loading};
}

export default UseProfile;