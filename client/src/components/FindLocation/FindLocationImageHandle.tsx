import { useEffect, useState } from "react";
import FindLocationGetImageBox from "./FindLocationGetImageBox";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";
import { Coordinate, sendPredictRequest } from "../../API/predict";

function testRequest() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("ㅋㅋ");
    }, 5000);
  });
}

const FindLocationImageHandle: React.FunctionComponent = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const [loadingState, setLoadingState] = useState<boolean[]>([]);
  // 분석 결과 저장하는 state
  const [analyzeResultList, setAnalyzeResultList] = useState<Coordinate[][]>(
    []
  );
  const [startImageIndex, setStartImageIndex] = useState(0);
  // 좌표 계산 함수 -> 분석 결과로 대체하기
  const getCoordinate = () => {
    return Array(Math.ceil(Math.random() * 3 + 1))
      .fill(0)
      .map(() => ({
        lat: Math.random() / 100 + 37.588556,
        lng: Math.random() / 100 + 127.019981,
        degree: Math.random() * 360,
      }));
  };

  const sendTestRequest = async (imgList: File[]) => {
    setLoadingState((loadingState) => [
      ...loadingState,
      ...imgList.map((_) => true),
    ]);
    const res = await testRequest();
    setAnalyzeResultList((analyzeResultList) => [
      ...analyzeResultList,
      getCoordinate(),
    ]);
    setLoadingState((loadingState) =>
      loadingState.map((_, index) =>
        loadingState.length - 1 - imgList.length < index ? false : _
      )
    );
  };
  useEffect(() => {
    if (!imageList.length) {
      return;
    }
    sendTestRequest(imageList.slice(startImageIndex));
    setStartImageIndex(imageList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageList]);

  return (
    <>
      <FindLocationGetImageBox
        imageList={imageList}
        setImageList={setImageList}
        loadingState={loadingState}
        setSelectedLocationIndex={setSelectedLocationIndex}
      />
      <GoogleMapApi
        coordinate={analyzeResultList}
        selectedLocationIndex={selectedLocationIndex}
        setSelectedLocationIndex={setSelectedLocationIndex}
      />
    </>
  );
};

export default FindLocationImageHandle;
