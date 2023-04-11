interface RightArrowSvgProps {
  width?: string;
}

const RightArrowSvg: React.FunctionComponent<RightArrowSvgProps> = ({
  width = "110px",
}) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_14_8321)">
        <path
          d="M74.1217 50.4167L49.5367 25.8317L56.0175 19.3508L91.6667 55L56.0175 90.6492L49.5367 84.1683L74.1217 59.5833L18.3333 59.5833L18.3333 50.4167L74.1217 50.4167Z"
          fill="#03053D"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_8321">
          <rect
            width="110"
            height="110"
            fill="white"
            transform="translate(0 110) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightArrowSvg;
