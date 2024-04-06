import DeleteButton from "@/components/Buttons/DeleteButon";
import { Category, MenuItems } from "@/types/menu";

interface CategoryItemProps {
    category: Category;
    menuItems: MenuItems[];
    setEditCategory: React.Dispatch<React.SetStateAction<Category | null>>;
    setCategoryName: React.Dispatch<React.SetStateAction<string>>;
    onDelete: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    category, menuItems, setEditCategory, setCategoryName, onDelete
}) => {
    return (
        <div
            key={category._id}
            className="bg-canvas rounded-xl p-2 px-4 flex gap-1 mb-2 border-none items-center"
        >
            <div className="grow flex flex-row mx-auto">
                <span className="font-semibold">{category.name}</span>
                <div className="flex flex-row gap-2 mx-auto ">
                    {menuItems.filter(item => item.category?.toString() === category._id).map(item => (
                        <span key={item._id} className="text-gray-400 text-sm">{item.name},</span>
                    ))}
                </div>
            </div>
            <div className="flex gap-1">
                <button type="button" className="bg-tertiary border-none" onClick={() => {
                    setEditCategory(category);
                    setCategoryName(category.name);
                }}>
                    Edit
                </button>
                <DeleteButton label={'Delete'} onDelete={() => onDelete(category._id)} />
            </div>
        </div>
    )
}

export default CategoryItem;