import { useEffect, useState } from "react";
import FindLocationGetImageBox from "./FindLocationGetImageBox";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";
import { Coordinate, sendSearchRequest } from "../../API/search";

const FindLocationImageHandle: React.FunctionComponent = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const [uploadedIndex, setUploadedIndex] = useState<number>();

  // 분석 결과 저장하는 state
  const [analyzeResultList, setAnalyzeResultList] = useState<Coordinate[]>([]);

  // 좌표 계산 함수 -> 분석 결과로 대체하기
  const getCoordinate = (length: number) => {
    return Array(length)
      .fill(0)
      .map((_, i) => ({
        lat: 0.1 * i + 37.5,
        lng: 0.1 * i + 126.988259,
      }));
  };

  useEffect(() => {
    if (!imageList.length) {
      return;
    }

    if (uploadedIndex == undefined) {
      console.log("first:" + imageList.length);
      sendSearchRequest(imageList).then((res) => {
        setUploadedIndex(imageList.length - 1);
        setAnalyzeResultList([...analyzeResultList, res.coordinate]);
      });
    } else {
      sendSearchRequest(imageList.slice(uploadedIndex + 1)).then((res) => {
        setUploadedIndex(imageList.length - 1);
        setAnalyzeResultList([...analyzeResultList, res.coordinate]);
      });
    }
  }, [imageList]);

  return (
    <>
      <FindLocationGetImageBox
        imageList={imageList}
        setImageList={setImageList}
      />
      <GoogleMapApi
        coordinate={imageList.map((_, idx) => getCoordinate(idx + 1))}
      />
    </>
  );
};

export default FindLocationImageHandle;
