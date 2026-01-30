import { HomeBody } from "@/components/Modal/components/home/HomeBody";
import { HomeManage } from "@/components/Modal/components/home/HomeManage";
import { HomeMap } from "@/components/Modal/components/home/HomeMap";
import HomeMovingImage from "@/components/Modal/components/home/HomeMovingImage";

export default function MainPage() {
  return (
    <div className="flex w-full flex-col">
      <HomeMovingImage />
      <div className="flex flex-col bg-white px-[90px] pb-[131px] pt-[69px]">
        <HomeBody />
        <HomeManage />
        <HomeMap />
      </div>
    </div>
  );
}
