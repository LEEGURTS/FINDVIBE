import { sendGetLogRequest } from "../../../API/predict";
import MyPageMyRecordItem from "./MyPageMyRecordItem";
import { useState, useEffect } from 'react';

interface LOG_RESPONSE  {
  req_log_id: number,
  image_src: string,
  predict: {
      adr: string,
      ang: number,
      lat: number,
      lng: number
  },
  res_time: string
}

interface LOG {
  img : string,
  location : string,
  date : string,
}


const MyPageMyRecord: React.FunctionComponent = () => {
  const [Record, setRecord] = useState<LOG[]>([]);

  const GetUserPredictLog = () => {
    sendGetLogRequest(undefined)
    .then((res)=>{
      console.log(res);
      const userRecord:LOG_RESPONSE[] = res.result;
      const transformedData:LOG[] = userRecord.map((record:LOG_RESPONSE) => {
        return {
          img: record.image_src,
          location: record.predict.adr,
          date: record.res_time,
        };
      });
      setRecord(transformedData);
    })
    .catch((err)=>{
      console.log(err);
      return;
    });
  }

  useEffect(()=>{
    GetUserPredictLog();
  },[]);

  return (
    <main className="col-span-6 tablet:col-span-8 h-[calc(100svh-64px)] overflow-y-scroll scrollbar-hide flex-col p-4 justify-center grid grid-cols-3 tablet:grid-cols-4 gap-4">
      {Record.map((data, index) => (
        <MyPageMyRecordItem
          key={index}
          img={data.img}
          location={data.location}
          date={data.date}
        />
      ))}
    </main>
  );
};

export default MyPageMyRecord;
