import { signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import User from "../icons/User";
import { Keys } from "../icons/Symbol";

export default function ProfileDropdown({status, name, images, email}) {

    const handleLogout = () => {
        const logout = signOut();
        toast.promise(logout, {
            loading: 'Loading...',
            success: 'Logout Succesfully!',
            error: 'Error',
        });
    }

    return (
        <div className="absolute right-0 mt-0 top-14 flex w-60 flex-col gap-3 rounded-xl bg-tertiary p-4 text-black shadow-xl border-2 border-tertiary invisible lg:visible">
            <div className="flex items-center gap-3">
                <div className="flex w-12 h-12 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-50">
                    <img className="w-auto h-full scale-125" src={images || `/images/profile.png`} alt="Profile" />
                </div>
                <div>
                    <div className="flex gap-1 text-sm font-semibold">
                        <span>{name || `Silahkan login`}</span>
                        { status === 'authenticated' && (
                            <span className="text-sky-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
                                </svg>
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-slate-400">{email}</div>
                </div>
            </div>
            <div className="border-t border-slate-500/30"></div>
            <div className="flex justify-around">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl font-semibold">268</span>
                    <span className="text-sm text-slate-400">Following</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl font-semibold">897</span>
                    <span className="text-sm text-slate-400">Followers</span>
                </div>
            </div>
            <div className="border-t border-slate-500/30"></div>
            { status === 'authenticated' && (
                <div className="flex flex-col">
                    <Link href={'/dashboard/profile'} className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-primary hover:text-white">
                        <User />
                        <span>Profile</span>
                    </Link>
                    <Link href={'/dashboard/profile/reset-password'} className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-primary hover:text-white">
                        <Keys />
                        <span>Change Passoword</span>
                    </Link>
                </div>
            )}
            {status === 'authenticated' && (
                <button 
                    className="flex justify-center gap-3 rounded-md bg-red-600 py-2 px-3 font-semibold text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400"
                    onClick={handleLogout}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                    </svg>
                    <span>Logout</span>
                </button>
            )}
            {status !== 'authenticated' && (
                <Link href={'/login'}>
                    <button className="flex justify-center gap-3 rounded-md bg-green-600 py-2 px-3 font-semibold text-white hover:bg-green-500 focus:ring-2 focus:ring-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                        </svg>
                        <span>Login</span>
                    </button>
                </Link>
            )}
        </div>
    )
}