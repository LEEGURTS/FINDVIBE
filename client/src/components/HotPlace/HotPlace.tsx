import Footer from "../Footer/Footer";
import GridLayout from "../Layout/GridLayout";
import HotPlaceMainBox from "./HotPlaceMainBox";
import HotPlaceText from "./HotPlaceText";

const HotPlace: React.FunctionComponent = () => {
  return (
    <main className="relative w-full top-[64px] min-h-[calc(100vh-64px)]">
      <GridLayout>
        <HotPlaceText />
        <HotPlaceMainBox />
      </GridLayout>
      <Footer />
    </main>
  );
};

export default HotPlace;
