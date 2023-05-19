import { sendMultipartRequest } from "./api";

export interface Coordinate {
  lat: number;
  lng: number;
}

export const sendPredictRequest = async (imageFiles: File[], nickname: string) => {
  return await sendMultipartRequest("/predict", nickname, imageFiles);
};
