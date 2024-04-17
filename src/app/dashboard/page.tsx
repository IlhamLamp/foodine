"use client";
import UseProfile from "@/components/UseProfile";
import { redirect } from "next/navigation";

const DashboardPage: React.FC = () => {
    const {loading, data} = UseProfile();

    if (loading) {
        return 'Loading users info...!'
    }

    // if (!data) {
    //     return redirect('/login');
    // }

    return (
        <section className="mt-24 mx-auto">
            DASHBOARD
        </section>
    )
}

export default DashboardPage;