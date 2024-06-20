import SearchMenuBtn from "./SearchMenuBtn";

const Hero: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1170px] w-full absolute">
        <div className="absolute inset-0 bg-primary/40 mx-2 my-4 lg:m-0 z-10 rounded-3xl"/>
        <div className="absolute inline-block z-5 px-2 py-4 lg:p-0">
            <picture>
                <source media="(min-width: 900px)" srcSet="/images/ml.jpeg"/>
                <img 
                    src="/images/hero-mobile.jpeg"
                    alt="hero"
                    className="object-cover rounded-3xl" 
                />
            </picture>
        </div>
        <div className="relative text-white z-20">
            <div className="relative flex flex-col items-center text-center max-w-[550px] mx-auto pt-6 pb-11 lg:pt-14 lg:pb-20">
                <img src="/images/logo.png" alt="logo" className="w-[70px] lg:w-[100px] bg-white rounded-full" />
                <h1 className="my-2 max-w-[250px] text-2xl lg:text-5xl font-bold lg:max-w-none">
                    Ingin ngemil? Pesan online aja
                </h1>
                <p className="max-w-[300px] lg:max-w-none text-sm lg:text-lg">
                    Perutmu meronta? Pesan snack favoritmu secepat kilat. Pilihan menunya banyak, dijamin bikin harimu bahagia!
                </p>
            </div>
        </div>
        <div className="mt-4 absolute flex flex-col bg-white shadow-xl rounded-xl mx-auto left-[50%] z-10 w-[calc(100vw-48px)] max-w-[400px] -translate-x-[50%] -translate-y-[60%] transform p-4 text-left md:w-[461px] md:max-w-none md:p-6 lg:w-[520px] lg:p-8">
            <span className="mb-2 block text-gray-500">Cari menu kesukaanmu</span>
            <div className="flex flex-col items-center justify-center mx-auto">
                <SearchMenuBtn />
            </div>
        </div>
    </div>
  )
}

export default Hero;