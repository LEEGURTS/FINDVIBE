import { sendMultipartRequest } from "./api";

export interface Coordinate {
  lat: number;
  lng: number;
}

export const sendSearchRequest = async (imageFiles: File[]) => {
  return await sendMultipartRequest("/search", imageFiles);
};
