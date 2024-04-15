import Link from "next/link";
import { IoPencil } from "react-icons/io5";

export const EditButton = ({ id }: { id: string }) => {
    return (
      <Link
        href={`/dashboard/users/edit/${id}`}
        className="flex items-center text-white bg-tertiary border-none rounded-xl px-4"
      >
        <IoPencil size={20} />
      </Link>
    );
};