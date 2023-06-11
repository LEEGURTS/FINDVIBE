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
      <img src={img} alt="" className="aspect-square w-full" />
      <p className="font-bold text-[1.2em]">{location}</p>
      <p className="text-gray">{date}</p>
    </div>
  );
};

export default MyPageMyRecordItem;
