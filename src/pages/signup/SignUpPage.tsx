import AuthHeader from "@/components/Header/AuthHeader";
import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-white pt-9">
      <AuthHeader backTo="/select-symptom" />
      <div className="flex justify-center pt-[0px]">
        <div className="flex w-full max-w-[404px] flex-col items-center">
          <div className="h-[40px]" />
          <div className="flex w-full flex-col items-center gap-[10px] pb-[100px]">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
