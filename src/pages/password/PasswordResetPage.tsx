import AuthHeader from "@/components/Header/AuthHeader";
import PasswordResetForm from "@/pages/password/components/PasswordResetForm";

const PasswordResetPage = () => {
  return (
    <div className="flex flex-col bg-white pt-9">
      <AuthHeader backTo="/find-password" />

      <div className="flex justify-center pt-[40px]">
        <div className="flex w-full max-w-[354px] flex-col items-center md:max-w-[404px]">
          <div className="flex w-full flex-col items-center gap-[10px]">
            <PasswordResetForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
