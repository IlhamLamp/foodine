const MiniStatusButton: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case 'settlement':
            return <span className="rounded-full bg-success text-white text-xs m-1 py-1 px-2">success</span>;
        case 'pending':
            return <span className="rounded-full bg-pending text-white text-xs m-1 py-1 px-2">pending</span>;
        case 'failed':
            return 'c'
        case 'error':
            return 'd'
        case 'unpaid':
            return 'e'
        default:
            return
    }
}

export default MiniStatusButton;