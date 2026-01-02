import AuthHeader from "../common/components/AuthHeader";
import EmailRequestForm from "./components/EmailRequestForm";

const PasswordEmailPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-20 border-b" />
      <div className="h-[50px]" />
      <AuthHeader />

      <div className="flex justify-center pt-[40px]">
        <div className="flex w-full max-w-[404px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-[10px]">
            <EmailRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordEmailPage;
