"use client";
import { useEffect, useRef, useState } from "react";
import Close from "../icons/Close";
import HamburgerMenu from "../icons/HamburgerMenu";
import Link from "next/link";
import navItems from "./navItems";
import { usePathname } from "next/navigation";
import Search from "../icons/Search";
import User from "../icons/User";
import { useSession } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";

const Header: React.FC = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const path = usePathname();

    const { status, data : session} = useSession();
    const userData = session?.user;

    let userName = userData?.name || userData?.email;
    const firstLetter = userName?.charAt(0);
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    
    const images = userData?.image;
    const email = userData?.email;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    }

    return (
        <header
            className={`
                fixed left-0 top-0 z-50 w-screen bg-white transition-all ease-in-out duration-300
                ${isScrolled ? 'py-2 lg:py-1 shadow-md': 'py-5'} ${ menuOpen ? "h-[calc(50vh)]" : "" }
            `}
        >
            {/* CONTAINER */}
            <div className="max-w-[1170px] w-full h-full mx-auto px-4 sm:px-8 xl:px-0 lg:flex items-center justify-between relative">
                {/* LOGO */}
                <div className="lg:w-3/12 flex items-center justify-between">
                    <Link href="/" className="font-bold flex items-center gap-2 text-2xl">
                        <img src="/images/logoname.png" alt="logo" className="w-[130px] lg:w-1/2" />
                    </Link>
                    {/* MOBILE-MENU */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="my-1 items-center border-none">
                            { menuOpen ? <Close /> : <HamburgerMenu /> }
                        </button>
                    </div>
                </div>

                {/* MENU */}
                <div 
                    className={
                        `w-full lg:w-9/12 h-0 lg:h-auto lg:visible lg:flex items-center justify-between
                        mx-auto px-4 sm:px-8 xl:px-0
                        ${ menuOpen ? "block mt-10" : "invisible" }`
                    }     
                >
                    <nav>
                        <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-10">
                            <li>
                                <Link href={'/'} className={`hover:text-black hover:ease-in-out flex items-center justify-between gap-3 ${path === '/' ? 'text-black border-b-4 border-primary' : 'text-gray-600 '}`}>
                                    Beranda
                                </Link>
                            </li>
                            { navItems.map((item) => (
                                <li key={item.id} className="group relative lg:py-2">
                                    <Link 
                                        href={item.path}
                                        className={`
                                            hover:text-black hover:ease-in-out flex items-center justify-between gap-3
                                            ${path === item.path || path.includes(item.path) ? 'text-black border-b-4 border-primary' : 'text-gray-600 '}
                                        `}
                                    >
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))}  
                        </ul>
                    </nav>
                    {/* PROFILE */}
                    <div className="flex flex-wrap items-center px-2 lg:px-0 mt-7 lg:mt-0 gap-10">
                        <div className="flex items-center gap-5">
                            <div className="bg-tertiary profile-hover cursor-pointer text-primary hover:text-white hover:bg-secondary">
                                <Search />
                            </div>
                            <div className="flex justify-center items-center">
                                <button 
                                    className="bg-gray-100 profile-hover cursor-pointer text-black hover:text-white hover:bg-gray-300 focus:ring focus:bg-gray-300 focus:text-white" 
                                    onClick={toggleProfile}
                                >
                                    { status === 'authenticated' ? <span className="px-2">{firstLetter}</span> : <User />}
                                </button>
                                { profileOpen &&
                                    <ProfileDropdown status={status} name={userName} images={images} email={email} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;