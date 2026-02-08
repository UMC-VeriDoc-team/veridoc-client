import { useEffect } from "react";
import { useHomeStore } from "@/stores/home/useHomeStore";
import HomeBody from "@/pages/home/components/HomeBody/HomeBody";
import HomeManage from "@/pages/home/components/HomeBody/HomeManage";
import HomeMap from "@/pages/home/components/map/HomeMap";
import HomeMovingImage from "@/pages/home/components/banner/HomeMovingImage";
import { useAuthStore } from "@/stores/login/useAuthStore";

const MainPage = () => {
  const { initAuth } = useAuthStore();
  const { fetchHome } = useHomeStore();

  useEffect(() => {
    void initAuth();
    void fetchHome();
  }, [fetchHome, initAuth]);

  return (
    <div className="w-full">
      <HomeMovingImage />

      <div className="pb-24 pt-0 sm:pb-32 sm:pt-[69px]">
        <div className="mx-auto w-full max-w-[1360px] sm:px-8">
          <div className="flex flex-col gap-y-24 sm:gap-y-[140px]">
            <HomeBody />
            <HomeManage />
            <HomeMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
