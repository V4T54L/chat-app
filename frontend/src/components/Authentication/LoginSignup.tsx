import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Onboarding from "./Onboarding";

const LoginSignup: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState(true);

  const handleContinue = () => setIsOnboarding(false);

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-base-200">
      {isOnboarding ? (
        <>
          <Onboarding />
          <button className="btn btn-primary mt-6" onClick={handleContinue}>
            Continue to Login / Sign Up
          </button>
        </>
      ) : (
        <AuthForm mode="login" />
      )}
    </div>
  );
};

export default LoginSignup;