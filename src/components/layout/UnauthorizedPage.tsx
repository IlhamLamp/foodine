import Link from "next/link";

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-sm">
                <h1 className="text-9xl font-bold text-gray-900">Oops</h1>
                <p className="text-2xl text-gray-900 mt-4">
                    Your access is limited on this page, please log in using your account
                </p>
                <Link href="/menu">
                    <button className='bg-primary mt-8 text-white'>View All Menu</button>
                </Link>
            </div>
        </div>
    )
}

export default UnauthorizedPage;