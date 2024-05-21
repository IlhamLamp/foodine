import Skeleton from "react-loading-skeleton";

const SkeletonInvoice: React.FC = () => {
    return (
        <div className="invoice-skeleteon bg-black">
            <Skeleton height={60} /> 
            <Skeleton count={2} height={40} />
            <Skeleton height={50} />
        </div>
    )
}

export default SkeletonInvoice;