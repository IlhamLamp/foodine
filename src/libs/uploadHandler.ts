import cloudinary from './cloudinary';

export const UploadImage = async (file: File, folder: string) => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        cloudinary.uploader
        .upload_stream(
            {
                resource_type: "auto",
                folder: folder,
            },
            async (err, result) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve(result);
            }
        )
        .end(bytes);
    })
}

export const DeleteImage = async (public_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.uploader.destroy(public_id);
            return resolve(result);
        } catch (error: any) {
            reject (new Error(error.message));
        }
    })
}

export function ExtractPublicId(url: string): string | null {
    try {
        const urlObject = new URL(url);
        const pathParts = urlObject.pathname.split('/');
        const lastPartWithExtension = pathParts[pathParts.length - 1];
        const publicId = lastPartWithExtension.split('.')[0];
        return publicId;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
} 