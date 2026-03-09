import {useMutation} from '@tanstack/react-query';
import {uploadImage} from '@/lib/imageUpload';
import {useAuth} from './useAuth';

/**
 * Hook for uploading images using the image upload service.
 */
export const useImageUpload = () => {
    const {user} = useAuth();

    const mutation = useMutation({
        mutationFn: async (file: File) => {
            const token = user ? await user.getIdToken() : undefined;
            return uploadImage(file, token);
        },
        onError: (error) => {
            console.error('Image upload failed:', error);
        },
    });

    return {
        uploadImage: mutation.mutateAsync,
        isUploading: mutation.isPending,
        error: mutation.error,
        reset: mutation.reset,
    };
};
