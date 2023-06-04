import { sendGetLogRequest } from "../../../API/predict";
import MyPageMyRecordItem from "./MyPageMyRecordItem";
import { useState, useEffect } from 'react';

const MyPageMyRecord: React.FunctionComponent = () => {
  const [Record, setRecord] = useState([]);

  const tempData = [
    {
      img: "https://picsum.photos/300/300",
      location: "서울시 노원구 노원로 광운대학교",
      date: "2023-03-03",
    },
    {
      img: "https://picsum.photos/300/300",
      location: "서울시 노원구 노원로 광운대학교",
      date: "2023-03-03",
    },
    {
      img: "https://picsum.photos/300/300",
      location: "서울시 노원구 노원로 광운대학교",
      date: "2023-03-03",
    },
    {
      img: "https://picsum.photos/300/300",
      location: "서울시 노원구 노원로 광운대학교",
      date: "2023-03-03",
    },
  ];

  const GetUserPredictLog = () => {
    sendGetLogRequest(undefined)
    .then((res)=>{
      console.log(res);
      setRecord(res);
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
      {tempData.map((data, index) => (
        <MyPageMyRecordItem
          key={index}
          img={data.img}
          location={data.location}
          date={data.date}
        />
      ))}
      {tempData.map((data, index) => (
        <MyPageMyRecordItem
          key={index}
          img={data.img}
          location={data.location}
          date={data.date}
        />
      ))}
      {tempData.map((data, index) => (
        <MyPageMyRecordItem
          key={index}
          img={data.img}
          location={data.location}
          date={data.date}
        />
      ))}
      {tempData.map((data, index) => (
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
