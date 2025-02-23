import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Authentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleAuthentication = (data: any) => {
    console.log(data); // Handle your authentication here
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <Onboarding />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-primary text-center">
            Chatify
          </h1>
          <form onSubmit={handleSubmit(handleAuthentication)} className="mt-6">
            <ToggleButton isLogin={isLogin} setIsLogin={setIsLogin} />
            <InputField
              label="Username"
              type="text"
              register={register}
              required
              error={errors.username}
            />
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              register={register}
              required
              error={errors.password}
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
            />
            <Button type="submit" color="primary" className="w-full mt-4">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <div className="mt-4">
              <a href="#" className="text-secondary text-sm hover:underline">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  return (
    <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-ternary">
      {/* Add animations or transitions here */}
      <h2 className="text-3xl font-bold text-center text-primary">Discover Chatify!</h2>
      <p className="text-secondary text-center mt-4">A seamless way to connect with friends and family through messaging and calls.</p>
      {/* Add more onboarding content here */}
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  required?: boolean;
  error?: any;
  toggleShowPassword?: () => void;
  showPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, register, required, error, toggleShowPassword, showPassword }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        {...register(label.toLowerCase(), { required })}
        type={type}
        className={`block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-accent ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={label}
      />
      {label === "Password" && (
        <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 flex items-center pr-3">
          {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
        </button>
      )}
      {error && <p className="text-red-500 text-sm">{`${label} is required`}</p>}
    </div>
  </div>
);

interface ToggleButtonProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isLogin, setIsLogin }) => (
  <div className="flex justify-around py-2">
    <button type="button" onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-md ${isLogin ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
      Login
    </button>
    <button type="button" onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-md ${!isLogin ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
      Sign Up
    </button>
  </div>
);

interface ButtonProps {
  type: "button" | "submit";
  children: React.ReactNode;
  color: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, children, color, className }) => (
  <button type={type} className={`bg-${color} text-white font-semibold px-4 py-2 rounded-md hover:bg-opacity-80 ${className}`}>
    {children}
  </button>
);

export default Authentication;