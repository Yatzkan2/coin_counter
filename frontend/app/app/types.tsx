import { CameraType } from "expo-camera";
export type Prediction = {
    predictions: [
        {
            class_id: number,
            class_name: "0.1_NIS" | "0.5_NIS" | "1_NIS" | "2_NIS" | "5_NIS" | "10_NIS",
            confidence: number
        }
    ]
}

export type CameraProps = {
    facing: CameraType,
    toggleCameraFacing: () => void
}