"use client";
import Pagination from "@/components/Buttons/Pagination";
import UserSearchBar from "@/components/Dashboard/Users/SearchBar";
import UsersTable from "@/components/Dashboard/Users/UsersTable";
import { BackArrow } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { BasicUser } from "@/types/user-information";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";

export default function UsersPage ({ searchParams} : Readonly<{
    searchParams?: {
        query?: string;
        page?: string
    };
}>) {
    const { loading, data } = UseProfile();

    const [users, setUsers] = useState<BasicUser[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    // pagination
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1;
    const perPage = 5;
    
    const totalPages = Math.ceil(totalUsers / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutOfRange = page > totalPages;

    const pageNumbers: number[] = [];
    const offsetNumber = 3;
    for ( let i = page - offsetNumber; i <= page + offsetNumber; i++ ) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }
    // 

    useEffect(() => {
        fetchUsers(page, query);
    }, [searchParams, page]);

    function fetchUsers(pageNumber: number = 1, query: string = "") {
        const queryParams = new URLSearchParams({
            page: pageNumber.toString(),
            per_page: perPage.toString(),
            q: query,
        });
        fetch(`/api/dashboard/users?${queryParams}`).then(res => {
            res.json().then(data => {
                setUsers(data.users);
                setTotalUsers(data.totalUser);
            })
        })
    }

    if (loading) {
        return 'Loading users info...!'
    }

    if (!data.admin) {
        return redirect('/login');
    }

    return (
        <div id="users" className="mt-2">
            <div className="flex items-center justify-between gap-1">
                <UserSearchBar />
                <div>
                    <Link href="/dashboard/users/create" className="inline-flex items-center space-x-1 text-white bg-primary hover:bg-secondary px-5 py-[9px] rounded-md text-sm btn-hover">
                        <IoAddSharp size={20} />
                        Create
                    </Link>
                </div>
            </div>
            <div className="mt-2">
                <UsersTable users={users} prevPage={prevPage} perPage={perPage} page={page}/>
            </div>
            {isPageOutOfRange ? (
                <div className="mx-auto text-center flex flex-col">
                    <h1 className="text-xl">No more pages...</h1>
                    <div className="my-3 mx-auto">
                        <Link href={`?page=1`} className="flex flex-row bg-primary hover:bg-secondary text-white hover:text-canvas p-4 rounded-2xl"><BackArrow /></Link>
                    </div>
                </div>
            ) : (
                <Pagination page={page} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}