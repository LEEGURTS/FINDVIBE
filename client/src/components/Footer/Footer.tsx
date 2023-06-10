import LogoSvg from "../../assets/Svg/LogoSvg";

const Footer: React.FunctionComponent = () => {
  return (
    <>
      <div className="flex-grow"></div>
      <div className="w-full mt-[64px] h-[64px] flex items-center justify-between p-8">
        <LogoSvg width={100} />
        <div className="text-[#707070] text-[0.8em]">참빛설계 감성찾이</div>
        <div className="text-[#707070] text-[0.8em]">광운대학교</div>
      </div>
    </>
  );
};

export default Footer;
