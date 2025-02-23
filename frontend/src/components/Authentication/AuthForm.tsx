import React, { } from "react";
import { useForm } from "react-hook-form";

interface AuthFormProps {
    mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        console.log("Form submitted: ", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">{mode === "login" ? "Login" : "Sign Up"}</h1>

            <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
            />
            <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
            />

            {mode === "signup" && (
                <input
                    {...register("confirmPassword", { required: true })}
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                />
            )}

            <button type="submit" className="btn btn-primary w-full">
                {mode === "login" ? "Login" : "Sign Up"}
            </button>

            <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500">Forgot Password?</a>
                <span className="text-gray-500">{mode === "login" ? "Don't have an account?" : "Already have an account?"}</span>
                <button className="text-blue-500">{mode === "login" ? "Sign Up" : "Login"}</button>
            </div>

            <div className="divider" />
            <div className="flex justify-around">
                <button className="btn btn-outline">Google</button>
                <button className="btn btn-outline">Facebook</button>
            </div>
        </form>
    );
};

export default AuthForm;