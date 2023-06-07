import moment from "moment";

interface IndexRecordItemProps {
  data: {
    date: string;
    locations: string[];
  };
}

const IndexRecordItem: React.FunctionComponent<IndexRecordItemProps> = ({
  data,
}) => {
  return (
    <>
      <div className="font-bold text-deeporange tablet:text-[1em] tablet:col-start-2 tablet:col-span-2 self-center">
        {moment(data.date).format("YYYY년 MM월 DD일")}
      </div>
      <div className="col-span-4 tablet:col-start-4 tablet:col-end-10"></div>
      <div className="tablet:col-start-8 tablet:col-end-12 justify-self-end flex">
        {data.locations.map((location, index) => (
          <div key={index} className="mx-2">
            {location + (data.locations.length - 1 === index ? "" : ",")}
          </div>
        ))}
      </div>
    </>
  );
};

export default IndexRecordItem;
