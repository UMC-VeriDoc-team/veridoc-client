import AuthHeader from "@/components/header/AuthHeader";
import PasswordResetForm from "@/pages/password/components/PasswordResetForm";

const PasswordResetPage = () => {
  return (
    <div className="flex flex-col bg-white pt-9">
      <AuthHeader />

      <div className="flex justify-center pt-[40px]">
        <div className="flex w-full max-w-[404px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-[10px]">
            <PasswordResetForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
