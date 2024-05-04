"use client";
import UseProfile from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import UserContactInformation from "./UserContactInformation";
import { UserLocation } from "@/types/user-information";

export default function UserForm({ user, onSave }) {

    const [name, setName] = useState<string>(user?.name || ''); 
    const [image, setImage] = useState<string>(user?.image || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [phone, setPhone] = useState<string>(user?.phone || '');
    const [location, setLocation] = useState<UserLocation>( user?.location || {
        latitude: "",
        longitude: "",
    });
    const [province, setProvince] = useState<string>(user?.province || '');
    const [regencies, setRegencies] = useState<string>(user?.regencies || '');
    const [district, setDistrict] = useState<string>(user?.district || '');
    const [villages, setVillages] = useState<string>(user?.villages || '');
    const [postalCode, setPostalCode] = useState<string>(user?.postalCode || '');
    const [address, setAddress] = useState<string>(user?.address || '');
    const [admin, setAdmin] = useState<boolean>(user?.admin || false);
    const { data:loggedInUserData } = UseProfile();

    function handleUserContactChange(propName: string, value: any) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'location') setLocation(value);
        if (propName === 'province') setProvince(value);
        if (propName === 'regencies') setRegencies(value);
        if (propName === 'district') setDistrict(value);
        if (propName === 'villages') setVillages(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'address') setAddress(value);
    }

    const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onSave(ev, { name, image, email, phone, location, province, regencies, district, villages, postalCode, address, admin })
    }

    return (
        <div className="flex gap-4 mt-6">
            <div className="p-2 rounded-lg relative max-w-[300px]">
                <EditableImage link={image} setLink={setImage}/>
            </div>
            <form className="grow" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Nama Lengkap</label>
                        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="First and last name" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" disabled={true} value={email} />
                    </div>
                </div>
                <UserContactInformation
                    userContactInformationProps={{ phone, location, province, regencies, district, villages, postalCode, address }}
                    setUserContactInformationProps={handleUserContactChange} 
                />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input 
                                id="adminCb" type="checkbox" className=""
                                defaultChecked={admin}
                                onClick={(ev: any) => setAdmin(ev.target.checked)} 
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit" className="btn-hover">Save</button>
            </form>
        </div>
    )
}