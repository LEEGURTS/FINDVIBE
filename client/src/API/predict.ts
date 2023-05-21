import { sendMultipartRequest } from "./api";

export interface Coordinate {
  lat: number;
  lng: number;
}

export const sendPredictRequest = async (imageFiles: File[]) => {
  return await sendMultipartRequest("/predict", imageFiles);
};
