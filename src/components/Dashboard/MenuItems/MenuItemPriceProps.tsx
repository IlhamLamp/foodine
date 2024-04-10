import { ChevronDown, ChevronUp } from "@/components/icons/Arrow";
import { PlusCircle, Trash } from "@/components/icons/Symbol";
import { useState } from "react";

export default function MenuItemPriceProps({ name, addLabel, props, setProps}) {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    function addProp() {
        setProps((oldProps: any) => {
            return [...oldProps, {name:'', price:0}]
        })
    }

    function editProp(ev: any, index: any, prop: any) {
        const newProp = ev.target.value;
        setProps((prevProps: any) => {
            const newProps  = [...prevProps];
            newProps[index][prop] = newProp;
            return newProps ;
        })
    }

    function removeProp(indexToRemove: any) {
        setProps((prev: any[]) => prev.filter((_v,index) => index !== indexToRemove))
    }

    return (
        <div className="bg-tertiary p-2 rounded-xl my-2">
            <button type="button" onClick={() => setIsOpen(prev => !prev)} className="inline-flex p-1 border-0 justify-start w-full">
                {isOpen && (<ChevronUp />)}
                {!isOpen && (<ChevronDown />)}
                <span className="text-white">{name}</span>
                <span className="text-white">({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((prop, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <div>
                            <label className="text-white/80">Name</label>
                            <input 
                                type="text"
                                placeholder="Size name"
                                value={prop.name}
                                onChange={(ev) => editProp(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label className="text-white/80">Extra price</label>
                            <input
                                type="text"
                                placeholder="Extra price"
                                value={prop.price}
                                onChange={(ev) => editProp(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2 px-2"
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-canvas items-center"
                >
                    <PlusCircle/>
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}