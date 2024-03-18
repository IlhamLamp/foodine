import Link from "next/link";

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-sm">
                <h1 className="text-9xl font-bold text-gray-900">404</h1>
                <p className="text-2xl text-gray-900 mt-4">
                Page not found. We couldn't find what you were looking for.
                </p>
                <Link href="/menu">
                    <button className='bg-primary mt-8 text-white'>View All Menu</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;