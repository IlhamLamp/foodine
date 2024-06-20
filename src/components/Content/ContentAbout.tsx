const ContentAbout = () => {

    const content = [
        {id: 1, name: 'variant', img: '/images/content-1.png', desc: 'Dengan variasi menu tiap minggunya'},
        {id: 2, name: 'cod', img: '/images/content-2.png', desc: 'Pilih bayar di tempat? tentu bisa untukmu'},
        {id: 3, name: 'payment-gateway', img: '/images/content-3.png', desc: 'Pembayaran digital buat kamu yang anti cash'},
        {id: 4, name: 'delivery', img: '/images/content-4.png', desc: 'Diantar dengan sepenuh hati dan aman'},
    ]

    return (
        <div className="container mx-auto mt-32 max-w-full">
            <h1 className="text-center text-2xl font-semibold">Kenapa memilih produk kami?</h1>
            <div className="mt-10 grid grid-cols-4 gap-4 justify-center text-center items-center xl:shadow-small-blue">
                {content && content.map((c) => (
                    <div key={c.id} className="flex flex-col mx-auto items-center text-center justify-center">
                        <div className="flex items-center justify-center w-[150px] h-[150px] rounded-md overflow-hidden"> 
                            <img src={c.img} className="object-cover w-full h-full" alt={c.name} />
                        </div>
                        <p className="mt-2">{c.desc}</p>
                   </div>
                ))}
            </div>
        </div>
    )
}

export default ContentAbout