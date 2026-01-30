import HomeBody from "@/components/Modal/components/home/HomeBody";
import HomeManage from "@/components/Modal/components/home/HomeManage";
import HomeMap from "@/components/Modal/components/home/HomeMap";
import HomeMovingImage from "@/components/Modal/components/home/HomeMovingImage";

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
