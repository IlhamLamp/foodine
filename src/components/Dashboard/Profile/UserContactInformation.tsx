import { District, Province, Regencies, Villages } from "@/types/user-information";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PopupMap from "./PopupMap";
import { GetAddress, ReverseGeocoding } from "@/libs/geoPosition";
import MapPin from "@/components/icons/MapPin";

export default function UserContactInformation({ userContactInformationProps, setUserContactInformationProps }) {

    const { phone, location, province, regencies, district, villages, postalCode, address } = userContactInformationProps;
    const { status } = useSession();

    const [provList, setProvList] = useState<Province[]>([]);
    const [regenciesList, setRegenciesList] = useState<Regencies[]>([]);
    const [districtsList, setDistrictsList] = useState<District[]>([]);
    const [villagesList, setVillagesList] = useState<Villages[]>([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState<string | number | null>(null);
    const [selectedRegenciesId, setSelectedRegenciesId] = useState<string | number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<string | number | null>(null);
    const [selectedVillagesId, setSelectedVillagesId] = useState<string | number | null>(null);

    const [showPopupMap, setShowPopupMap] = useState<boolean>(false);
    const [showLatitude, setShowLatitude] = useState<string | number>('');
    const [showLongitude, setShowLongitude] = useState<string | number>('');

    const [position, setPosition] = useState<string | number>('');

    useEffect(() => {
        ReverseGeocoding(location?.latitude || showLatitude, location?.longitude || showLongitude)
        .then(data => {
            const address = GetAddress(data);
            setPosition(address);
        })
        .catch(error => {
            console.error('Error fetching address:', error.message);
        });
    }, []);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then(response => response.json())
            .then(provinces => setProvList(provinces));
        }
    }, [status])

    useEffect(() => {
        if (status === 'authenticated' && selectedProvinceId !== null) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`)
            .then(response => response.json())
            .then(regencies => setRegenciesList(regencies));   
        }
    }, [status, selectedProvinceId])

    useEffect(() => {
        if (status === 'authenticated' && selectedRegenciesId !== null) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegenciesId}.json`)
            .then(response => response.json())
            .then(districts => setDistrictsList(districts));
        }
    }, [status, selectedRegenciesId])

    useEffect(() => {
        if (status === 'authenticated' && selectedDistrictId !== null) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrictId}.json`)
            .then(response => response.json())
            .then(villages => setVillagesList(villages));
        }
    }, [status, selectedDistrictId])

    const handleProvinceChange = (ev: any) => {
        const selectedValue = ev.target.value;
        const selectedProv = provList.find(p => p.name === selectedValue)?.id;
        setSelectedProvinceId(selectedProv);
        setUserContactInformationProps('province', selectedValue);
    }

    const handleRegenciesChange = (ev: any) => {
        const selectedValue = ev.target.value;
        const selectedReg = regenciesList.find(r => r.name === selectedValue)?.id;
        setSelectedRegenciesId(selectedReg);
        setUserContactInformationProps('regencies', selectedValue);
    }

    const handleDistrictChange = (ev: any) => {
        const selectedValue = ev.target.value;
        const selectedDist = districtsList.find(d => d.name === selectedValue)?.id;
        setSelectedDistrictId(selectedDist);
        setUserContactInformationProps('district', selectedValue);
    }

    const handleVillagesChange = (ev: any) => {
        const selectedValue = ev.target.value;
        const selectedVill = villagesList.find(v => v.name === selectedValue)?.id;
        setSelectedVillagesId(selectedVill);
        setUserContactInformationProps('villages', selectedValue);
    }

    if (showPopupMap) {
    }

    const handlePopupMap = () => {
        setShowPopupMap(!showPopupMap)

        if (!location?.latitude && !location.langitude) {
            try {
                navigator?.geolocation.getCurrentPosition(position => {
                    const { coords: { latitude, longitude }} = position;
                    setShowLatitude(latitude.toString());
                    setShowLongitude(longitude.toString());
                })
            } catch (error: any) {
                console.error("Error getting geolocation:", error)
            }
        }
    }

    const handleSaveLocation = () => {
        setUserContactInformationProps('location', {
            latitude: showLatitude,
            longitude: showLongitude,
        })
    }

    return (
        <>
            { showPopupMap && (
                <PopupMap 
                    handlePopup={handlePopupMap} handleSaveLocation={handleSaveLocation}
                    latitude={showLatitude || location?.latitude} longitude={showLongitude || location?.longitude}
                 />
            )}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>No. HP</label>
                    <input 
                        type="tel"
                        value={phone || ''}
                        onChange={(ev) => setUserContactInformationProps('phone', ev.target.value)} 
                        placeholder="088888888888" 
                    />
                </div>
                <div>
                    <label className="flex flex-row gap-2"><MapPin />Lokasi</label>
                    <input 
                        type="map"
                        value={position || ''}
                        onClick={handlePopupMap}
                        onChange={handleSaveLocation}
                        placeholder="Tekan Disini Untuk Menandai"
                        className="cursor-pointer btn-hover"
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label>Provinsi</label>
                    <select className="form-control" onChange={handleProvinceChange}>
                        <option value={province || ''} className="select-none">{province}</option> 
                        {provList.map((p: Province) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Kab/Kota</label>
                    <select className="form-control" onChange={handleRegenciesChange}>
                        <option value={regencies || ''} className="select-none">{regencies}</option>
                        {regenciesList.map((r: Regencies) => (
                            <option key={r.id} value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Kecamatan</label>
                    <select className="form-control" onChange={handleDistrictChange}>
                        <option value={district || ''} className="select-none">{district}</option>
                        {districtsList.map((d: District) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>Kelurahan/Desa</label>
                    <select className="form-control" onChange={handleVillagesChange}>
                        <option value={villages || ''} className="select-none">{villages}</option>
                        {villagesList.map((v: Villages) => (
                            <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Kode Pos</label>
                    <input
                        type="text"
                        value={postalCode || ''}
                        onChange={(ev) => setUserContactInformationProps('postalCode', ev.target.value)}
                        placeholder="17777" 
                    />
                </div>
            </div>
            <div>
                <label>Alamat Lengkap</label>
                    <input
                        type="text"
                        value={address || ''}
                        onChange={(ev) => setUserContactInformationProps('address', ev.target.value)}
                        placeholder="Street Address" 
                    />
            </div>
        </>
    )
}