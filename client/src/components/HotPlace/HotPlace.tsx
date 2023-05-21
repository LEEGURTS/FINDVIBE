import Footer from "../Footer/Footer";
import GridLayout from "../Layout/GridLayout";
import HotPlaceMainBox from "./HotPlaceMainBox";
import HotPlaceText from "./HotPlaceText";

const HotPlace: React.FunctionComponent = () => {
  return (
    <main className="relative flex flex-col w-full top-[64px] min-h-[calc(100vh-144px)]">
      <GridLayout>
        <HotPlaceText />
        <HotPlaceMainBox />
      </GridLayout>
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
};

export default HotPlace;
