import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react'; // Importing icons from lucide-react
import { useNavigate } from 'react-router-dom';

interface FormData {
  email?: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Include watch here
  } = useForm<FormData>();

  const navigate = useNavigate()

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/chat")
    // Handle authentication here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm ${
        isOpen ? 'visible' : 'invisible'
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        className="bg-base-200 p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 id="auth-modal-title" className="text-lg font-bold text-primary mb-4">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="mb-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: !isLogin })}
                className="input input-bordered w-full"
                placeholder="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby="email-help"
              />
              {errors.email && <p id="email-help" className="text-error">{errors.email.message}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username', { required: true })}
              className="input input-bordered w-full"
              placeholder="Username"
              aria-invalid={errors.username ? 'true' : 'false'}
              aria-describedby="username-help"
            />
            {errors.username && <p id="username-help" className="text-error">{errors.username.message}</p>}
          </div>
          <div className="mb-4 relative">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="input input-bordered w-full"
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby="password-help"
            />
            <Eye className="absolute right-2 top-3" />
            {errors.password && <p id="password-help" className="text-error">{errors.password.message}</p>}
          </div>
          {!isLogin && (
            <div className="mb-4 relative">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: !isLogin,
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                className="input input-bordered w-full"
                placeholder="Confirm Password"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby="confirm-password-help"
              />
              <Eye className="absolute right-2 top-3" />
              {errors.confirmPassword && (
                <p id="confirm-password-help" className="text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <button type="submit" className="btn w-full btn-primary">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <span
            className="text-primary cursor-pointer"
            onClick={toggleForm}
            role="button"
            aria-pressed={!isLogin}
            tabIndex={0}
          >
            {' '}
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;