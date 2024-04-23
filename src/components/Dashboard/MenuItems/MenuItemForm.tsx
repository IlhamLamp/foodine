import EditableImage from "@/components/layout/EditableImage";
import { Category } from "@/types/menu";
import { useEffect, useRef, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

interface SizesProps {
    name: string;
    price: string;
}

export default function MenuItemForm ({ onSubmit, menuItem}) {

    const [image, setImage] = useState<string>(menuItem?.image || '');
    const [name, setName] = useState<string>(menuItem?.name || '');
    const [description, setDescription] = useState<string>(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState<string>(menuItem?.basePrice || '');
    const [category, setCategory] = useState<string>(menuItem?.category || '');
    const [categories, setCategories] = useState<Category[]>([]);

    const [sizes, setSizes] = useState<SizesProps[]>(menuItem?.sizes || []);
    const [stock, setStock] = useState<string>(menuItem?.stock || '');
    const [active, setActive] = useState<boolean>(menuItem?.active || false);

    const textAreaRef = useRef(null);
    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [description])


    useEffect(() => {
        fetch('/api/dashboard/categories/all').then(res => {
            res.json().then(data => (
                setCategories(data)
            ))
        })
    }, []);

    const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onSubmit(ev, { image, name, description, category, basePrice, sizes, stock, active });
    }

    return (
        <div className="flex max-w-3xl mt-2 mx-auto">
            <div className="p-2 rounded-lg max-w-[300px]">
                <EditableImage link={image} setLink={setImage}/>
            </div>
            <form className="mx-auto" onSubmit={handleFormSubmit}>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                        <div>
                            <label>Nama Produk</label>
                            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Product Name" required/>
                        </div>
                        <div>
                            <label>Kategori</label>
                            <select value={category} onChange={(ev) => setCategory(ev.target.value)} required>
                                {!category && (
                                    <option value="" className="text-gray-400" disabled={true}>Select category</option>
                                )}
                                {categories?.length > 0 && categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Harga</label>
                            <input type="text" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)} placeholder="5000" required={true}/>
                        </div>
                        <div>
                            <label>Stok</label>
                            <input type="text" value={stock} onChange={(ev) => setStock(ev.target.value)} placeholder="10" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col'>
                        <span>Description</span>
                        <textarea className='p-2 bg-gray-100 border-gray-300 active:outline-none focus:outline-none rounded-xl resize-none'
                            placeholder='Type something here ...' value={description} onChange={(ev) => setDescription(ev.target.value)} rows={2} ref={textAreaRef} 
                        />
                    </div>
                    <div>
                        <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />
                        <div>
                            <label className="inline-flex items-center cursor-pointer" htmlFor="activeStatus">
                                <input id="activeStatus" type="checkbox" defaultChecked={active} className="sr-only peer" onChange={(ev: any) => setActive(ev.target.checked)} />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                <span className="ms-3 font-medium text-gray-900">{ active ? 'Aktif' : 'Tidak Aktif'}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )

}