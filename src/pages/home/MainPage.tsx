import HomeBody from "@/pages/home/components/HomeBody/HomeBody";
import HomeManage from "@/pages/home/components/HomeBody/HomeManage";
import HomeMap from "@/pages/home/components/map/HomeMap";
import HomeMovingImage from "@/pages/home/components/banner/HomeMovingImage";

const MainPage = () => {
  return (
    <div className="flex w-full flex-col">
      <HomeMovingImage />
      <div className="grid grid-cols-[1fr_1350px_1fr] pb-32 pt-[69px]">
        <div />
        <div className="flex w-full flex-col items-center gap-y-[140px]">
          <HomeBody />
          <HomeManage />
          <HomeMap />
        </div>
        <div />
      </div>
    </div>
  );
};

export default MainPage;
