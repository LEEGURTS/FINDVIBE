import PlusIconSvg from "./../../assets/Svg/PlusIconSvg";
import { useRef } from "react";

interface FindLocationProps {
  imageList: File[];
  loadingState: boolean[];
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setSelectedLocationIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FindLocationGetImageBox: React.FunctionComponent<FindLocationProps> = ({
  imageList,
  setImageList,
  loadingState,
  setSelectedLocationIndex,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files);
  };

  const handleFile = (files: FileList) => {
    const fileList: Set<File> = new Set();

    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].name
        .split(".")
        .slice(-1)
        .toString()
        .toLocaleUpperCase();
      if (fileType !== "JPG" && fileType !== "PNG" && fileType !== "JPEG") {
        alert("지원하지 않는 파일 포멧입니다!");
        return;
      }
      fileList.add(files[i]);
    }
    setImageList([...imageList, ...Array.from(fileList)]);
  };

  return (
    <>
      <input
        type="file"
        className="invisible w-[0px] h-[0px]"
        ref={inputRef}
        multiple
        onChange={(e) => {
          console.log(e.target.files);
          handleFile(e.target.files!);
        }}
        accept=".jpg, .png"
      />
      <div
        className="relative z-50 col-span-6 tablet:col-start-2 tablet:col-end-12 h-[30vh] shadow-xl bg-white flex flex-col items-center overflow-y-scroll"
        style={{
          justifyContent: imageList.length > 0 ? "start" : "center",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleOnDrop}
        onClick={() => {
          if (!imageList.length) {
            inputRef.current?.click();
          }
        }}
      >
        {imageList.length > 0 ? (
          <>
            {imageList.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col tablet:flex-row items-start tablet:items-center justify-between text-black bg-[#D9D9D9] p-2 tablet:py-1 tablet:px-2"
              >
                <div className="flex flex-row items-center">
                  <div className="bg-deeporange rounded-full w-[0.7em] h-[0.7em] mr-[1em]"></div>
                  <span>{item.name}</span>
                </div>
                <div className="flex-grow"></div>
                <div className="w-full tablet:w-auto mt-2 tablet:mt-0 flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center">
                    {loadingState[idx] ? (
                      <span>위치분석 중</span>
                    ) : (
                      <span>위치분석 완료</span>
                    )}
                    <button
                      onClick={() => setSelectedLocationIndex(idx)}
                      className={`ml-2 bg-${
                        loadingState[idx] ? "gray" : "deeporange"
                      } px-2 py-1 text-white`}
                      disabled={loadingState[idx]}
                    >
                      위치보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="flex items-center justify-center py-[1em] px-2 w-full"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <PlusIconSvg />
              <p className="ml-[1em] ">이미지 추가히기</p>
            </button>
          </>
        ) : (
          <div className="flex items-center p-4">
            <PlusIconSvg />
            <p className="ml-4 break-keep">
              이곳에 드래그 앤 드랍 혹은 클릭하여 이미지를 업로드하세요.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FindLocationGetImageBox;
