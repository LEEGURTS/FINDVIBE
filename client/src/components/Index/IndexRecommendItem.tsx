interface IndexRecommendProps {
  title: string;
  width: string;
  count: number;
  opacity: number;
}

const IndexRecommendItem: React.FunctionComponent<IndexRecommendProps> = ({
  title,
  width,
  count,
  opacity,
}) => {
  return (
    <>
      <div className="col-start-2 col-span-2 self-center">{title}</div>
      <div className="col-start-4 col-end-10">
        <div
          className="bg-[#FF7B54] h-[2em]"
          style={{
            width: width,
            opacity: opacity + "%",
          }}
        ></div>
      </div>
      <div className="col-start-10 col-end-12 justify-self-end self-center text-gray">
        {count + "회"}
      </div>
    </>
  );
};

export default IndexRecommendItem;
