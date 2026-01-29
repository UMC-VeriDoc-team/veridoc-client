import { HomeBody } from "@/components/Modal/components/home/HomeBody";
import { HomeMap } from "@/components/Modal/components/home/HomeMap";
import HomeMovingImage from "@/components/Modal/components/home/HomeMovingImage";

export default function MainPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white pb-24">
      <HomeMovingImage />
      <HomeBody />
      <HomeMap />
    </div>
  );
}
