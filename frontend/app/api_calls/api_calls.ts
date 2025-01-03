import axios from 'axios';
import { Prediction } from '@/app/types';
const API_URL = 'http://10.0.0.14:8000';

export const testAccess = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.status);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export const predict = async (data: string | URL | Request): Promise<Prediction> => {
    console.log('prefetch...');
    try {
        // Fetch the image 
        
        const blobRes = await fetch(data);
        const blob = await blobRes.blob();

        // Get the binary data from the blob
        const binaryData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(blob);
        });

        // Create FormData
        const formData = new FormData();
        
        // Create the file object in a way that's compatible with both web and iOS
        const file = {
            uri: data,
            type: blob.type || 'image/jpeg',
            name: 'image.jpg',
        };

        // Append the file to FormData using the iOS-compatible object
        formData.append('file', file as any);

        // Set the correct headers and configs
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data: any) => data,
            timeout: 30000,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        };

        try {
            console.log('Sending request...');
            const response = await axios.post(
                `${API_URL}/predict/`,
                formData,
                config
            );
            console.log('Upload successful:', response.status);
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
            } else {
                console.error('Upload error:', error);
            }
            throw error;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
//################### WORKING IN BROWSER ###################
// import axios from 'axios';

// const API_URL = 'http://10.0.0.9:8000';

// export const testAccess = async () => {
//     try {
//         const response = await axios.get(API_URL);
//         console.log(response.status);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// export const predict = async (data: string) => {
//     console.log('prefetch...');
//     try {
//         // Fetch the image
//         const blobRes = await fetch(data);
//         const blob = await blobRes.blob();
        
//         // Create FormData properly
//         const formData = new FormData();
        
//         // Append the blob directly with the correct filename and type
//         formData.append('file', blob, 'image.jpg');
        
//         // Set the correct headers for multipart/form-data
//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             // Add timeout and max content length settings
//             timeout: 30000,
//             maxContentLength: Infinity,
//             maxBodyLength: Infinity
//         };

//         try {
//             const response = await axios.post(
//                 `${API_URL}/predict/`,
//                 formData,
//                 config
//             );
//             console.log('Upload successful:', response.status);
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error('Axios error:', {
//                     message: error.message,
//                     response: error.response?.data,
//                     status: error.response?.status
//                 });
//             } else {
//                 console.error('Upload error:', error);
//             }
//             throw error;
//         }
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// }