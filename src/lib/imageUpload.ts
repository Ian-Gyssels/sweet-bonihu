export const uploadImage = async (file: File, token?: string): Promise<string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('http://localhost:3000/upload/presigned-url', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to get presigned URL');
    }

    const {signedUrl, fileUrl} = await response.json();

    const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });

    if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text().catch(() => 'Unknown error');
        console.error('S3/R2 Upload Error:', errorText);
        throw new Error(`Failed to upload image to storage: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }

    return fileUrl;
};