export const fileUpload = async (file: File) => {
    if (!file) {
        throw new Error('No tenemos un archivo para subir');
    }
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dw6nlf6f5/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'journalapp');
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        console.log("resp", resp);
        

        if (resp.ok) {
            const cloudResp = await resp.json();
            console.log("cloudResp", cloudResp);
            
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};