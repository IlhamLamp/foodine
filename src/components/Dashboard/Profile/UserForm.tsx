"use client";
import UseProfile from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import UserContactInformation from "./UserContactInformation";
import { UserLocation } from "@/types/user-information";
import { HideEye, ShowEye } from "@/components/icons/Eye";

export default function UserForm({ user, onSave }) {

    const [name, setName] = useState<string>(user?.name || ''); 
    const [image, setImage] = useState<string>(user?.image || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [password, setPassword] = useState<string>(user?.password || '');
    const [confirmationPassword, setConfirmationPassword] = useState<string>(user?.password || '');
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
    const [admin, setAdmin] = useState<boolean>(user?.admin || '');
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

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false);
    const passwordToggle = () => {
        setShowPassword(!showPassword);
    }
    const passwordConfirmationToggle = () => {
        setShowConfirmationPassword(!showConfirmationPassword);
    }

    const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        // validation
        if (password !== confirmationPassword) {
            alert("Passwords do not match");
            return; 
        }
        onSave(ev, { name, image, email, password, phone, location, province, regencies, district, villages, postalCode, address })
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
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Password</label>
                        <div className="relative">
                            <input type={(showPassword === false) ? 'password' : 'text'} value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" />
                            <div className="absolute top-2 right-4 cursor-pointer text-primary">
                                { (showPassword === false) 
                                    ? <div onClick={passwordToggle}><ShowEye/></div> 
                                    : <div onClick={passwordToggle}><HideEye/></div> 
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Konfirmasi Password</label>
                        <div className="relative">
                            <input type={(showConfirmationPassword === false) ? 'password' : 'text'} value={confirmationPassword} onChange={(ev) => setConfirmationPassword(ev.target.value)} placeholder="Konfirmasi Password" />
                            <div className="absolute top-2 right-4 cursor-pointer text-primary">
                                { (showConfirmationPassword === false) 
                                    ? <div onClick={passwordConfirmationToggle}><ShowEye/></div>
                                    : <div onClick={passwordConfirmationToggle}><HideEye/></div> 
                                }
                            </div>
                        </div>
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