import { useEffect, useState } from "react";

const UseProfile = () => {
    const [data, setData] = useState({admin: false});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/dashboard/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })
    }, []);
    return {loading, data};
}

export default UseProfile;