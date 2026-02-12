import Icon from "@/components/Icon/Icon";

interface HospitalMarkerProps {
  active: boolean;
}

const HospitalMarker = ({ active }: HospitalMarkerProps) => {
  return (
    <div className="isolation-isolate relative flex h-12 w-12 items-center justify-center sm:h-[80px] sm:w-[80px]">
      <Icon
        name={active ? "marker-active" : "marker-default"}
        className="absolute inset-0 z-0 h-full w-full"
      />
      <Icon
        name="veridoc"
        className={`absolute left-1/2 z-10 -translate-x-1/2 rounded-full object-cover ${active ? "opacity-100" : "opacity-90"} top-[3px] h-8 w-8 sm:top-1 sm:h-14 sm:w-14`}
      />
    </div>
  );
};

export default HospitalMarker;
