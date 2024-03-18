"use client";
import { words } from "@/libs/data";
import { useState } from "react"
import Search from "../icons/Search";

const SearchMenuBtn: React.FC = () => {
    const [activeSearch, setActiveSearch] = useState<string[]>([]);

    const handleSearch = (e: any) => {
        if(e.target.value === ""){
            setActiveSearch([])
            return false
        }
        const filteredWords = words.filter((w) => w.includes(e.target.value)).slice(0, 8);
        setActiveSearch(filteredWords);
    }

  return (
    <form className='w-[350px] lg:w-[450px] relative'>
        <div className="relative">
            <input type="search" placeholder='Type Here' className='w-full p-4 rounded-full bg-white shadow-xl border-t' onChange={(e) => handleSearch(e)}/>
        </div>
        {/* <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-tertiary profile-hover cursor-pointer text-primary hover:text-white hover:bg-secondary">
            <Search />  
        </button> */}
        {
            activeSearch.length > 0 && (
                <div className="absolute top-16 p-4 bg-white text-black shadow-xl w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                    {
                        activeSearch.map(s => (
                            <span key={s}>{s}</span>
                        ))
                    }
                </div>
            )
        }        
    </form>
  )
}

export default SearchMenuBtn;