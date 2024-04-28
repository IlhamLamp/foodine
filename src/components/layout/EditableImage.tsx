"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function EditableImage({ link, setLink }) {
    const [isUploading, setIsUploading] = useState(false);
    
    const pathname = usePathname();
    const containChildRoute = pathname.split("/");
    const publicId = containChildRoute[containChildRoute.length - 1];

    // upload path
    const finalPath = containChildRoute[2];

    // IMAGE UPLOADING
    async function handleFileChange(ev: any) {
        try {
            setIsUploading(true);
            const files = ev.target.files;

            if (files?.length !== 1) {
                return toast.error("Error uploading file");
            }

            const data = new FormData();
            data.set('path', finalPath);
            data.set('file', files[0]);
            data.set('id', publicId);

            // Validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            const maxFileSize = 5 * 1024 * 1024; // 5 MB

            if (!allowedTypes.includes(files[0].type)) {
                setIsUploading(false);
                return toast.error("Invalid file type. Only images are allowed.")
            }

            if (files[0].size > maxFileSize) {
                setIsUploading(false);
                return toast.error("File size exceeds the maximum limit (5 MB).");
            }

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(async response => {
                if (response.ok) {
                    return response.json().then(link => {
                        console.log(link);
                        setLink(link);
                    })
                }
            })

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete.',
                error: 'Upload error',
            });

            toast.success('Please wait a moment while the changes are applied.', {
                duration: 8000,
                icon: '😇',
            })

            setIsUploading(false);
        } catch (error: any) {
            console.log("Error", error.message);
        };
    }

    return (
        <>
            {link && (
                <Image src={link} className="rounded-lg w-auto h-auto mb-1" width={150} height={150} alt={'avatar'} />
            )}
            {!link && (
                <div className="text-center bg-gray-300 p-4 text-gray-500 rounded-lg mb-1 w-[150px] h-[100px]">
                  No image
                </div>
            )}        
            <label className={isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border bg-secondary hover:bg-tertiary rounded-lg p-2 text-center text-white hover:text-primary font-semibold btn-hover">Change Image</span>
            </label>
        </>   
    )
}