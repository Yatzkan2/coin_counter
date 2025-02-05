import { Prediction } from "./types";
const bcrypt = require('bcrypt-react-native');

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

export const hashPassword = async (password:string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (password:string, hashedPassword:string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};


