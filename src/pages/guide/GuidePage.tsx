import GuideHeader from "./components/GuideHeader";
import GuideSymptomOnboarding from "./components/GuideSymptomOnboarding";
import RecommendEntry from "./components/RecommendEntry";

const GuidePage = () => {
  return (
    <>
      <GuideHeader />

      <div className="flex items-center justify-center py-28">
        <GuideSymptomOnboarding />
      </div>

      <RecommendEntry />
    </>
  );
};

export default GuidePage;
