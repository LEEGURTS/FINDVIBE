import Calendar from "react-calendar";
import GridLayout from "../Layout/GridLayout";
import "./Calender.css";
import { useState } from "react";
import { Value } from "react-calendar/dist/cjs/shared/types";
import moment from "moment";
import axios from "axios";
import GoogleMapApi from "../GoogleMap/GoogleMapApi";

const MyPlace: React.FunctionComponent = () => {
  const [date, setDate] = useState<Value>(new Date("2023-04-18"));
  const marks = {
    "2023-04-17": [
      [
        { lat: 37.493003, lng: 127.4963156065 },
        { lat: 37.494, lng: 127.497 },
      ],
    ],
    "2023-04-18": [
      [
        { lat: 37.619774, lng: 127.060926 },
        { lat: 37.63, lng: 127.07 },
      ],
    ],
    "2023-04-19": [
      [
        { lat: 37.619774, lng: 127.060926 },
        { lat: 37.63, lng: 127.07 },
      ],
    ],
  };

  const getAddressFromLatLng = async (latlng: { lat: number; lng: number }) => {
    try {
      const address = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`
      );
      return address.data.results;
    } catch {
      alert("주소를 가져오는데 실패했습니다.");
    }
  };

  return (
    <main className="relative w-full top-[64px] min-h-[calc(100vh-64px)]">
      <GridLayout>
        <div className="col-start-1 col-end-7 mt-4 flex items-center justify-center">
          <Calendar
            onChange={(e) => setDate(e)}
            value={date}
            formatDay={(_, date) => moment(date).format("DD")}
            tileDisabled={({ date }) => {
              return !Object.keys(marks).find(
                (x) => x === moment(date).format("YYYY-MM-DD")
              );
            }}
            tileContent={({ date, view }) => {
              let html = [];
              if (
                Object.keys(marks).find(
                  (x) => x === moment(date).format("YYYY-MM-DD")
                )
              ) {
                html.push(<div className="dot" key={date.toString()}></div>);
              }
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
            }}
          />
        </div>
        <div className="col-start-1 col-end-7 tablet:col-start-7 mt-4 p-4 border tablet:col-end-13 bg-white ">
          <p className="font-pretendardBold text-deeporange">
            {moment(date as Date).format("YYYY년 MM월 DD일")}
            {(marks as any)[moment(date as Date).format("YYYY-MM-DD")].map(
              (item: any) =>
                item.map((pos: any) => <div>{`${pos.lat} , ${pos.lng}`}</div>)
            )}
          </p>
        </div>
        <GoogleMapApi
          coordinate={(marks as any)[moment(date as Date).format("YYYY-MM-DD")]}
        />
      </GridLayout>
    </main>
  );
};

export default MyPlace;