import { HideEye, ShowEye } from "@/components/icons/Eye";
import { ShieldCircle } from "@/components/icons/Symbol";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordForm({ user, onSave, isValid }) {

    const [lastPassword, setLastPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmationPassword, setConfirmationPassword] = useState<string>('');

    const [showLastPassword, setShowLastPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false);

    const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (newPassword.length < 5) {
            return toast.error("Password must be 5 characters or above")
        }
        if (lastPassword === newPassword) {
            return toast.error("New Passwords can't be same with previous")
        }
        if (newPassword !== confirmationPassword) {
            return toast.error("Confirmation password must be same")
        }
        onSave(ev, { email: user?.email, lastPassword, newPassword })
    }

    return (

        <div className="mt-2 max-w-4xl mx-auto">
            { isValid ? (
                <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                    <div className="bg-white p-4 rounded-lg text-center mx-auto">
                        <div className="mb-4 flex flex-col items-center">
                            <span className="text-secondary"><ShieldCircle /></span>
                            <span className="w-1/2">Password has changes, you must login to verify.</span>
                        </div>
                        <div className="mx-auto my-2">
                            <Link 
                                href={'/login'}
                                className="bg-primary border-none text-white px-4 py-2 rounded-xl btn-hover hover:bg-secondary text-canvas"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-2xl font-semibold">Reset Password</h1>
                        <p className="w-1/2 text-center text-sm text-gray-500">insert your new password in the field below, then retype it for confirmation. It&apos;s case sensitive</p>
                    </div>
                    <form className="max-w-md mx-auto my-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <div>
                                <label className={isValid ? '' : 'text-red-500'}><span className="text-sm">Current Password</span></label>
                                <div className="relative">
                                    <input type={(showLastPassword === false) ? 'password' : 'text'} value={lastPassword} onChange={(ev) => setLastPassword(ev.target.value)} placeholder="Current Password" />
                                    <div className="absolute top-2 right-4 cursor-pointer text-primary">
                                    <div onClick={() => setShowLastPassword(!showLastPassword)}>
                                        { showLastPassword ? <HideEye /> : <ShowEye /> }
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm">New Password</label>
                                <div className="relative">
                                    <input type={(showNewPassword === false) ? 'password' : 'text'} value={newPassword} onChange={(ev) => setNewPassword(ev.target.value)} placeholder="New Password" />
                                    <div className="absolute top-2 right-4 cursor-pointer text-primary">
                                        <div onClick={() => setShowNewPassword(!showNewPassword)}>
                                            { showNewPassword ? <HideEye /> : <ShowEye /> }
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm">Confirmation Password</label>
                                <div className="relative">
                                    <input type={(showConfirmationPassword === false) ? 'password' : 'text'} value={confirmationPassword} onChange={(ev) => setConfirmationPassword(ev.target.value)} placeholder="Confirmation Password" />
                                    <div className="absolute top-2 right-4 cursor-pointer text-primary">
                                        <div onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}>
                                            { showConfirmationPassword ? <HideEye /> : <ShowEye /> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex my-2">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}