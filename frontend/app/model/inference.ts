// const modelPath:string = './best.onnx';
// import * as ort from 'onnxruntime-react-native';
// //import { InferenceSession, Tensor } from "onnxruntime-react-native";

// function blobToFloat32Array(blob: Blob): Promise<Float32Array> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             if (reader.result instanceof ArrayBuffer) {
//                 resolve(new Float32Array(reader.result));
//             } else {
//                 reject(new Error("Failed to read blob as ArrayBuffer"));
//             }
//         };
//         reader.onerror = () => reject(new Error("Error reading blob"));
//         reader.readAsArrayBuffer(blob);
//     });
// }

// const uriToTensor = async (uri: string) => {
//     const image = await fetch(uri);
//     const imageBlob = await image.blob();
//     const imageArray = await blobToFloat32Array(imageBlob);
//     const tensor = new ort.Tensor("float32", imageArray, [1, 3, 640, 640]); //CAUSE PROBLEM WHEN UNCOMMENTED
// //     return tensor;
// }

// // export const detect = async (uri:string|undefined) => {
// //     if(!uri) {
// //         throw new Error('No image provided');
// //     }
// //     try {
// //         const data:ort.Tensor = await uriToTensor(uri);
// //         const input:ort.InferenceSession.OnnxValueMapType = {
// //             "input": data
// //         };
// //         // load a model
// //         const session: ort.InferenceSession = await ort.InferenceSession.create(modelPath);
// //         // input as InferenceSession.OnnxValueMapType
// //         const result = session.run(input, ['num_detection:0', 'detection_classes:0']);
// //         return result;
// //     } catch (error) {
// //         console.error(error);
// //     }
// // }

