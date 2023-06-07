import IndexRecordItemProps from "./IndexRecordItem";
import recordExample from "../../assets/Img/recordExample.png";
const IndexRecord: React.FunctionComponent = () => {
  return (
    <>
      <div className="col-span-6 tablet:col-start-2 tablet:col-end-12 mt-[4em] mb-[2em]">
        <p className="text-[2em] font-pretendardBold">과거의 기록 제공</p>
        <p>과거의 내가 조회했던, 과거를 회상시켜드립니다.</p>
      </div>
      <img
        alt=""
        src={recordExample}
        className="col-span-6 tablet:col-start-2 tablet:col-end-12"
      ></img>
    </>
  );
};

export default IndexRecord;
