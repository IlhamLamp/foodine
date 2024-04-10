import { Skeleton } from "@/components/Skeleton/Skeleton";

const CategorySkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            <Skeleton className="w-[30ch] h-[1.25rem]"/>
        </div>
    )
}

export default CategorySkeleton;