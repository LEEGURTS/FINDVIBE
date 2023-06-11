import { MODULETYPE } from "../components/FindLocation/FindLocationImageHandle";
import { sendMultipartRequest, sendPostRequest } from "./api";

export interface Coordinate {
  lat: number;
  lng: number;
  ang: number;
}

export const sendPredictRequest = async (
  imageFiles: File[],
  moduleType: MODULETYPE
) => {
  const module = moduleType === MODULETYPE.GOOGLE ? "google" : "model";
  return await sendMultipartRequest("/predict/" + module, imageFiles);
};

export const sendGetLogRequest = (selectDay: Date | undefined) => {
  const userData = {
    req_time: selectDay,
  };
  return sendPostRequest("/predict/log", userData);
};
