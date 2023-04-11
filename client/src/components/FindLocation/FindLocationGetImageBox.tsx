import PlusIconSvg from "./../../assets/Svg/PlusIconSvg";
import { useRef } from "react";

interface FindLocationProps {
  imageList: File[];
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
}

const FindLocationGetImageBox: React.FunctionComponent<FindLocationProps> = ({
  imageList,
  setImageList,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files);
  };

  const handleFile = (files: FileList) => {
    const fileList: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name
        .split(".")
        .slice(-1)
        .toString()
        .toLocaleUpperCase();
      if (fileName !== "JPG" && fileName !== "PNG") {
        alert("지원하지 않는 파일 포멧입니다!");
        return;
      }
      fileList.push(files[i]);
    }
    setImageList([...imageList, ...fileList]);
  };

  return (
    <>
      <input
        type="file"
        className="invisible w-[0px] h-[0px]"
        ref={inputRef}
        multiple
        onChange={(e) => {
          handleFile(e.target.files!);
        }}
        accept=".jpg, .png"
      />
      <div
        className="relative z-50 col-start-2 col-end-12 h-[30vh] drop-shadow-xl bg-white flex flex-col items-center overflow-y-scroll"
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
                className="w-full flex flex-row items-center justify-between text-black bg-[#D9D9D9] py-1 px-2"
              >
                <div className="flex flex-row items-center">
                  <div className="bg-deeporange rounded-full w-[0.7em] h-[0.7em] mr-[1em]"></div>
                  <span>{item.name}</span>
                </div>
                <div className="flex-grow"></div>
                <div className="text-gray text-[0.7em] flex flex-row items-center mr-[3em]">
                  <span className="mr-[2px]">결과에 만족하셨나요?</span>
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-shalloworange rounded-full w-[0.7em] h-[0.7em] mx-[2px]"
                        ></div>
                      );
                    })}
                </div>
                <div className="flex flex-row items-center">
                  <span>위치분석 중</span>
                  <button className="ml-2 bg-deeporange px-2 py-1 text-white">
                    위치보기
                  </button>
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
          <div className="flex items-center">
            <PlusIconSvg />
            <>이곳에 드래그 앤 드랍 혹은 클릭하여 이미지를 업로드하세요.</>
          </div>
        )}
      </div>
    </>
  );
};

export default FindLocationGetImageBox;
