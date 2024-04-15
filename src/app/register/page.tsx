"use client";
import ProviderLoginButton from "@/components/layout/ProviderLoginButton";
import { Profile } from "@/types/profile";
import Link from "next/link";
import { useState } from "react";

const RegisterPage: React.FC = () => {

    const name = '';
    const image = '';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [creatingUser, setCreatingUser] = useState<boolean>(false);
    const [userCreated, setUserCreated] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleFormSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        
        try {
            const registerForm: Profile = { name, email, password, image };
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(registerForm),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                setUserCreated(true);
            } else {
                setError(true);
            }
            setCreatingUser(false);
        } catch (error:any) {
            console.log("Signup failed", error.message);
        }
        
        setCreatingUser(false);
    };

    return(
        <section className="mt-36 mx-auto">
            <h1 className="text-center text-primary">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. <br />
                    Now you can {' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occured. <br />
                    Please try again later
                </div>
            )}
            <form className="block max-w-sm mx-auto mt-3" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" 
                    value={email}
                    disabled={creatingUser}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input type="password" placeholder="password" 
                    value={password}
                    disabled={creatingUser}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <ProviderLoginButton />
                <div className="text-center my-4 text-gray-500 border-t">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}

export default RegisterPage;