import { useEffect, useState } from "react";
import FindLocationGetImageBox from "./FindLocationGetImageBox";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";
import { Coordinate, sendPredictRequest } from "../../API/predict";

export enum MODULETYPE {
  GOOGLE,
  PYTHON,
}

export enum SUCCESSTYPE {
  SUCCESS,
  FAIL,
  WAITING,
}

const FindLocationImageHandle: React.FunctionComponent = () => {
  const [imageList, setImageList] = useState<File[]>([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const [successState, setSuccessState] = useState<SUCCESSTYPE[]>([]);
  // 분석 결과 저장하는 state
  const [analyzeResultList, setAnalyzeResultList] = useState<Coordinate[][]>(
    []
  );
  const [startImageIndex, setStartImageIndex] = useState(0);
  const [selectedModule, setSelectedModule] = useState<MODULETYPE>(
    MODULETYPE.GOOGLE
  );
  // 좌표 계산 함수 -> 분석 결과로 대체하기

  const sendImgPredictRequest = async (imgList: File[]) => {
    setSuccessState((successState) => [
      ...successState,
      ...imgList.map((_) => SUCCESSTYPE.WAITING),
    ]);
    const res = await sendPredictRequest(imgList, selectedModule);

    console.log(res);

    if (res === undefined) {
      setAnalyzeResultList((analyzeResultList) => [...analyzeResultList, []]);
      setSuccessState((successState) =>
        successState.map((state, index) =>
          successState.length - 1 - imgList.length < index
            ? SUCCESSTYPE.FAIL
            : state
        )
      );
      return;
    }
    setAnalyzeResultList((analyzeResultList) => [
      ...analyzeResultList,
      ...res.result.map((result: Coordinate[]) => result),
    ]);

    setSuccessState((successState) =>
      successState.map((state, index) =>
        successState.length - 1 - imgList.length < index
          ? res.result[index - (successState.length - imgList.length)].length >
            0
            ? SUCCESSTYPE.SUCCESS
            : SUCCESSTYPE.FAIL
          : state
      )
    );
  };
  useEffect(() => {
    if (!imageList.length) {
      return;
    }
    sendImgPredictRequest(imageList.slice(startImageIndex));
    setStartImageIndex(imageList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageList]);

  return (
    <>
      <FindLocationGetImageBox
        imageList={imageList}
        setImageList={setImageList}
        successState={successState}
        setSelectedLocationIndex={setSelectedLocationIndex}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
      />
      <GoogleMapApi
        coordinate={analyzeResultList.filter(
          (analyzeResult) => analyzeResult.length > 0
        )}
        selectedLocationIndex={selectedLocationIndex}
        setSelectedLocationIndex={setSelectedLocationIndex}
      />
    </>
  );
};

export default FindLocationImageHandle;
