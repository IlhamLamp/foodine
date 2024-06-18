"use client"
import DashboardCard from "@/components/Card/DashboardCard";
import { productsService } from "@/services/ProductsServices";
import { userService } from "@/services/UserService";
import { MenuItems } from "@/types/menu";
import { BasicUser } from "@/types/user-information";
import { useEffect, useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { MdFastfood, MdLocalShipping } from "react-icons/md";
import { TypesTransactionDB } from "@/types/transaction";
import { transactionService } from "@/services/TransactionService";
import { CountSales } from "@/libs/formattedCurrency";
import AdminBarChart from "./Chart/AdminBarChart";
import AdminPieChart from "./Chart/AdminPieChart";
import DashboardLatestOrder from "@/components/Card/DashboardLatestOrder";

const DashboardAdminPage = () => {
    const [users, setUsers] = useState<BasicUser[]>([]);
    const [products, setProducts] = useState<MenuItems[]>([]);
    const [transactions, setTransactions] = useState<TypesTransactionDB[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const u = await userService.getAllUsers();
            const p = await productsService.getAllProducts();
            const t = await transactionService.getAllTransaction();
            setUsers(u);
            setProducts(p);
            setTransactions(t);
        }
        fetchData();
    }, [])

    const totalSales = CountSales(transactions);

    const options = [
        { id: 1, card: 'users', data: users, link: '/dashboard/users', logo: <HiUsers className="text-white w-8 h-8" /> },
        { id: 2, card: 'products', data: products, link: '/dashboard/menu-items?page=1', logo: <MdFastfood className="text-white w-8 h-8" /> },
        { id: 3, card: 'transactions', data: transactions, link: '/dashboard/transactions', logo: <MdLocalShipping className="text-white w-8 h-8" /> },
        { id: 4, card: 'sales', data: totalSales, link: '#', logo: <GiReceiveMoney className="text-white w-8 h-8" /> },
    ]

    return (
        <div id="dashboard-admin">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center m-2">
                    { options && options.map((o, i) => (
                        <DashboardCard 
                            key={o.id}
                            id={o.id}
                            card={o.card}
                            data={o.data}
                            link={o.link}
                            logo={o.logo}
                        />
                    ))}
                </div>
                <div className="mt-2 flex flex-row justify-between bg-white shadow-lg rounded-lg">
                    <div className="w-1/2 flex flex-col items-center mx-auto m-2">
                        <span className="text-lg font-semibold">Last 6 months</span>
                        <AdminBarChart transactions={transactions} />
                    </div>
                    <div className="w-1/2 flex flex-col items-center mx-auto m-2">
                        <span className="text-lg font-semibold">Transaction Status</span>
                        <AdminPieChart transactions={transactions} />
                        <DashboardLatestOrder transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdminPage;