import AuthHeader from "@/components/Header/AuthHeader";
import EmailRequestForm from "@/pages/password/components/EmailRequestForm";

const PasswordEmailPage = () => {
  return (
    <div className="flex flex-col bg-white pt-9">
      <AuthHeader backTo="/login" />
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
