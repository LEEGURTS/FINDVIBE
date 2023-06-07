import { sendMultipartRequest, sendPostRequest } from "./api";

export interface Coordinate {
  lat: number;
  lng: number;
  degree: number;
}

export const sendPredictRequest = async (imageFiles: File[]) => {
  return await sendMultipartRequest("/predict", imageFiles);
};

export const sendGetLogRequest = (selectDay: Date | undefined) => {
  const userData = {
    req_time: selectDay,
  };
  return sendPostRequest("/predict/log", userData);
};
