import { BasicUser } from "@/types/user-information";
import { EditButton } from "./Button";
import moment from "moment";
import DeleteButton from "@/components/Buttons/DeleteButon";
import { Trash } from "@/components/icons/Symbol";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UsersTable ({ users, prevPage, perPage, page } : Readonly<{
    users: BasicUser[];
    prevPage: number;
    perPage: number;
    page: number;
}>) {

    const router = useRouter();

    const handleDeleteClick = async (id: string) => {

        const url = new URL('/api/dashboard/users', window.location.origin);
        console.log(url);
        url.searchParams.append('_id', id);

        try {
            const promise = new Promise<void>(async (resolve, reject) => {
                const response = await fetch(url.toString(), {
                    method: 'DELETE'
                });
                if (response.ok) {
                    router.refresh();
                    resolve();
                } else reject();
            });
    
            await toast.promise(promise, {
                loading: 'Deleting...',
                success: 'Deleted',
                error: 'Error',
            });
    
        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">#</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    {/* <th className="py-3 px-6">Role</th> */}
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                { users.map((user, index) => (
                    <tr key={user._id} className="bg-white border-b">
                    <td className="py-3 px-6">{page === 1 ? index + 1 : (prevPage * perPage) + (index + 1)}</td>
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">
                        {moment(user.createdAt).format('LL') || ''}
                    </td>
                    <td className="flex mx-auto justify-center w-[100px] gap-1 py-3">
                        <EditButton id={user._id} />
                        <DeleteButton label={<Trash />} onDelete={() => handleDeleteClick(user._id)} />
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};