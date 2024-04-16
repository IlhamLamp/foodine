import { signIn } from "next-auth/react"
import Image from "next/image";

const ProviderLoginButton: React.FC = () => {
    return (
        <div>
            <div className="my-4 text-center text-gray-500">
                or login with provider
            </div>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={() => signIn('google')} className="flex gap-4 justify-center">
                    <Image src="/images/google.png" width={24} height={24} alt="google" />
                    Login with Google
                </button>
                <button type="button" onClick={() => signIn('facebook', {callbackUrl: '/'})} className="flex gap-4 justify-center">
                    <Image src="/images/facebook.png" width={24} height={24} alt="facebook" />
                    Login with Facebook
                </button>
            </div>
        </div>
    )
}

export default ProviderLoginButton;