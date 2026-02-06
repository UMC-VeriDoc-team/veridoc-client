import Icon from "@/components/Icon/Icon";

interface HospitalMarkerProps {
  active: boolean;
  imageUrl?: string | null;
}

const HospitalMarker = ({ active, imageUrl }: HospitalMarkerProps) => {
  return (
    <div className="relative h-12 w-12 sm:h-[80px] sm:w-[80px]">
      {/* 마커 */}
      <Icon
        name={active ? "marker-active" : "marker-default"}
        className="absolute inset-0 h-full w-full"
      />

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="thumbnail"
          className="absolute left-1/2 top-[8px] h-[28px] w-[28px] -translate-x-1/2 rounded-full border border-white object-cover"
          draggable={false}
        />
      ) : null}
    </div>
  );
};

export default HospitalMarker;
