const MiniStatusButton: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        // TRANSACTION STATUS
        case 'settlement':
            return <span className="rounded-full bg-success text-white text-xs m-1 py-1 px-2">settlement</span>;
        case 'pending':
            return <span className="rounded-full bg-pending text-white text-xs m-1 py-1 px-2">pending</span>;
        case 'failed':
            return <span className="rounded-full bg-red-600 text-white text-xs m-1 py-1 px-2">failed</span>;
        case 'error':
            return 'd'
        case 'unpaid':
            return <span className="rounded-full bg-failed text-white text-xs m-1 py-1 px-2">unpaid</span>;
        // DELIVERY STATUS
        case 'packed':
            return <span className="rounded-full bg-success text-white text-xs m-1 py-1 px-2">packed</span>;
        default:
            return
    }
}

export default MiniStatusButton;