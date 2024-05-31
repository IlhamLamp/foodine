"use client";
import ProviderLoginButton from "@/components/layout/ProviderLoginButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);

    const handleFormSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setLoginInProgress(true);
        setLoginError(false);

        try {

            const response = await fetch('api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'},
            }) 

            if (response.ok) {
                await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: '/'
                })
                console.log("Succesfully login");
            } else {
                setLoginError(true);
                console.log('Login failed')
            }
            
        } catch (error: any) {
            console.log(error)
        }

        setLoginInProgress(false);

    }

    return (
        <section className="mt-36 mx-auto">
            <h1 className="text-center text-primary">
                Login
            </h1>
             {loginError && (
                <div className="my-4 text-center">
                    Incorrect username or password. <br />
                    Please try again
                </div>
            )}
            <form className="block max-w-sm mx-auto mt-3" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" 
                    value={email}
                    disabled={loginInProgress}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
                />
                <input type="password" placeholder="password" 
                    value={password}
                    disabled={loginInProgress}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
                />
                <button 
                    type="submit"
                    disabled={loginInProgress}
                >
                    Login
                </button>
                <ProviderLoginButton />
                <div className="text-center my-4 text-gray-500 border-t">
                    Don't have an account?
                    <Link className="underline text-primary font-bold" href={'/register'}> Register here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}

export default LoginPage;