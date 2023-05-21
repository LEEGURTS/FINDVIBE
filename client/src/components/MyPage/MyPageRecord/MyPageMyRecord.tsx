import MyPageMyRecordItem from "./MyPageMyRecordItem";

const MyPageMyRecord: React.FunctionComponent = () => {
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
