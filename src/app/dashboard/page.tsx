"use client";
import DashboardAdminPage from "@/components/Dashboard/Layout/Admin/DashboardAdminPage";
import DashboardUserPage from "@/components/Dashboard/Layout/User/DashboardUserPage";
import UseProfile from "@/components/UseProfile";
import { redirect } from "next/navigation";

const DashboardPage: React.FC = () => {
    const {loading, data} = UseProfile();

    if (loading) {
        return 'Loading users info...!'
    }

    if (!data) {
        return redirect('/login');
    }

    return (
        <section className="mt-2 mx-auto">
            { data?.admin 
                ? (<DashboardAdminPage />)
                : (<DashboardUserPage />)
            }
        </section>
    )
}

export default DashboardPage;