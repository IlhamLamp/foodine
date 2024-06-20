import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faPepperHot, faBacon, faStroopwafel, faCubesStacked, faBreadSlice, faLemon, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ContentCategory = () => {

    const content = [
        {id: 1, name: 'Biskuit', link: 'biskuit',icon: faCookieBite},
        {id: 2, name: 'Pedas', link: 'pedas',icon: faPepperHot},
        {id: 3, name: 'Stik', link: 'stik',icon: faBacon},
        {id: 4, name: 'Kerupuk', link: 'kerupuk',icon: faStroopwafel},
        {id: 5, name: 'Roti', link: 'roti',icon: faBreadSlice},
        {id: 6, name: 'Pillow', link: 'pillow',icon: faLemon},
        {id: 7, name: 'Wafer', link: 'wafer',icon: faLayerGroup},
        {id: 8, name: 'Paket', link: 'paket',icon: faCubesStacked},
    ]

    return (
        <div className="container relative z-40 mx-auto mt-20 max-w-[800px]">
            <h1 className="text-center text-2xl font-semibold">Bingung sama pilihannya? Mulai dari sini aja dulu</h1>
            <div className="mt-10 grid grid-cols-4 gap-4 justify-center xl:shadow-small-blue">
                {content && content.map((c) => (
                    <Link key={c.id} href={`/menu?search=${c.link}`} className="block py-5 text-center rounded-lg border border-gray-50 shadow-lg btn-hover hover:bg-gray-50 hover:shadow-xl">
                        <div className='flex flex-col items-center text-center'>
                            <FontAwesomeIcon icon={c.icon} className='w-14 h-14 text-center bg-primary text-white rounded-full p-1'/>
                            <p className="pt-2 text-md font-medium font-body text-green-900">
                                {c.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ContentCategory