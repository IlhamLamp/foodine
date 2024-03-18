const HomeFilterMenu: React.FC = () => {
    return (
        <section className="mx-auto pt-40">
            <div className="my-6 text-left md:text-center lg:my-10 mt-10 md:mt-12 lg:mt-20">
                <h2 className=" text-xl md:text-3xl lg:text-4xl">Bingung? Mulai dari sini aja dulu</h2>
            </div>
            <div>
                <div className="relative my-6 grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
                    <div className="transition-all duration-500 visible relative top-0 block opacity-100">
                        <div>
                            <a href="">Near Me</a>
                            <h3>Terdekat</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeFilterMenu;