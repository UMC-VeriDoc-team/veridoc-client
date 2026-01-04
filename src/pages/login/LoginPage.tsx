import { useNavigate } from "react-router-dom";
import LoginForm from "@/pages/login/components/LoginForm";
import BottomLinks from "@/pages/login/components/BottomLinks";
import AuthHeader from "@/components/header/AuthHeader";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white pt-9">
      <AuthHeader backTo="/" />
      <div className="flex justify-center pt-[0px]">
        <div className="flex w-full max-w-[404px] flex-col items-center">
          <div className="h-[40px]" />
          <div className="flex w-full flex-col items-center gap-[10px]">
            <LoginForm />
            <BottomLinks
              onClickFindPassword={() => navigate("/find-password")}
              onClickSignup={() => navigate("/signup")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
