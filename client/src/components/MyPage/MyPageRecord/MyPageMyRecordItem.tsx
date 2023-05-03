interface MyPageMyRecordItemProps {
  img: string;
  location: string;
  date: string;
}

const MyPageMyRecordItem: React.FunctionComponent<MyPageMyRecordItemProps> = ({
  img,
  location,
  date,
}) => {
  return (
    <div className="">
      <img src={img} alt="" />
      <p className="font-bold text-[1.2em]">{location}</p>
      <p className="text-gray">{date}</p>
    </div>
  );
};

export default MyPageMyRecordItem;
