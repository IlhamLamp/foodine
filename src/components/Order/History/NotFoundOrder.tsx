const NotFoundOrder: React.FC = () => {
    return (
        <div className="w-1/2 h-full flex mx-auto justify-center items-center flex-col">
            <img className="w-[400px]" src="/images/not-found.png" alt="not-found" />
            <h1 className="text-primary font-semibold text-2xl text-center">Oops, looks like you haven&apos;t ordered anything</h1>
        </div>
    )
}

export default NotFoundOrder;