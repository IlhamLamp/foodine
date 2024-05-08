const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
export const MIDTRANS_APP_URL = process.env.MIDTRANS_APP_URL;
export const MIDTRANS_AUTH_STRING = btoa(MIDTRANS_SERVER_KEY);
export const FRONT_END_URL = 'http://localhost:3000';