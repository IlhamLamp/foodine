export type UserLocation = {
    latitude: string;
    longitude: string;
}

export type Province = {
    id: string | number;
    name: string;
}

export type Regencies = {
    id: string | number;
    province_id: string | number;
    name: string;
}

export type District = {
    id: string | number;
    regency_id: string | number;
    name: string;
}

export type Villages = {
    id: string | number;
    district_id: string | number;
    name: string;
}

export type UserInformation = {
    name: string;
    image: string;
    email: string;
    password: string;
    phone: string;
    location: UserLocation;
    province: string;
    regencies: string;
    district: string;
    villages: string;
    postalCode: string;
    address: string;
    admin: boolean;
}