"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {

    const pathname = usePathname();
    const year = new Date().getFullYear();

    if (pathname === '/') {
        return (
            <footer className="container mx-auto mt-32 max-w-full px-3 pt-4 lg:px-9 border-t-2 bg-gray-50">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
    
                    <div className="sm:col-span-2">
                        <Link href="/" className="inline-flex items-center">
                            <img src="/images/logo.png" alt="logo" className="h-12 w-12" />
                            <span className="ml-2 text-2xl font-semibold tracking-tighter text-gray-800">ARYA KUE SNACK</span>
                        </Link>
                        <div className="mt-6 lg:max-w-xl">
                            <p className="text-sm text-gray-800">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi felis mi, faucibus dignissim lorem
                                id, imperdiet interdum mauris. Vestibulum ultrices sed libero non porta. Vivamus malesuada urna eu
                                nibh malesuada, non finibus massa laoreet. Nunc nisi velit, feugiat a semper quis, pulvinar id
                                libero. Vivamus mi diam, consectetur non orci ut, tincidunt pretium justo. In vehicula porta
                                molestie. Suspendisse potenti. 
                                </p>
                        </div>
                    </div>
    
                    <div className="flex flex-col gap-2 text-sm">
                        <p className="text-base font-bold tracking-wide text-gray-900">Contact Information</p>
                        <a href="https://wa.link/qkt8oa">{`+(62) 813-1413-4137`}</a>
                        <a href="#">Lorem ipsum</a>
                        <a href="#">Dolor sit amet</a>
                        <p className="text-base font-bold tracking-wide text-gray-900">Shop Address</p>
                        <a href="https://maps.app.goo.gl/GN79aMMVcRjoad2w6">Jl. Villa Mutiara Cikarang No.18, Ciantra, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530</a>
                    </div>
    
                    <div>
                        <p className="text-base font-bold tracking-wide text-gray-900">COMPANY IS ALSO AVAILABLE ON</p>
                        <div className="flex items-center gap-1 px-2">
                            <a href="#" className="w-full min-w-xl">
                                <img src="https://mcqmate.com/public/images/icons/playstore.svg" alt="Playstore Button "
                                    className="h-10" />
                            </a>
                            <a className="w-full min-w-xl" href="#">
                                <img src="https://mcqmate.com/public/images/icons/youtube.svg" alt="Youtube Button"
                                    className="h-28" />
                            </a>
                        </div>
                        <p className="text-base font-bold tracking-wide text-gray-900">Email</p>
                        <div className="flex">
                            <a href="#" title="send email">arya.kue@mail.com</a>
                        </div>
                    </div>
    
                </div>
    
                <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                    <p className="text-sm text-gray-600">© {year} Arya Kue Snack. All rights reserved.</p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a href="#"
                                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy
                                &amp; Cookies Policy
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">Disclaimer
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}

export default Footer;