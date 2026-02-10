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
          className="absolute left-1/2 top-[3px] h-8 w-8 -translate-x-1/2 rounded-full object-cover sm:top-1 sm:h-14 sm:w-14"
          draggable={false}
        />
      ) : null}
    </div>
  );
};

export default HospitalMarker;
