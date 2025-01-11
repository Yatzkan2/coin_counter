import { Prediction } from "./types";

export const predictionSum = (prediction: Prediction): number => {
    const values = {
        "0.1_NIS": 0.1,
        "0.5_NIS": 0.5,
        "1_NIS": 1,
        "2_NIS": 2,
        "5_NIS": 5,
        "10_NIS": 10
    }
    const predVals = prediction.predictions.map((pred) => values[pred.class_name]);
    return predVals.reduce((acc, curr) => acc + curr, 0);
    //prediction.predictions.reduce((acc, curr) => values[curr.class_name] + acc, 0)
}
