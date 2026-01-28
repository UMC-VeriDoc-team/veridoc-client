import AuthHeader from "@/components/Header/AuthHeader";
import SignUpForm from "@/pages/signup/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col bg-white pt-9">
      <AuthHeader backTo="/select-symptom" />
      <div className="flex justify-center px-6 pt-[0px]">
        <div className="flex w-full max-w-[354px] flex-col items-center md:max-w-[404px]">
          <div className="h-[40px]" />
          <div className="flex w-full flex-col items-center gap-[10px] pb-[40px]">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
