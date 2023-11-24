import React from 'react';
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
const SignUpAdmin = () => {
    const { createUser, updateUserProfile, socialLogIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const newUser = {...data}; 
        createUser(data.email, data.password)
      };
    return (
        <div className="flex">
        <div className="hero min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="hero-content flex-col gap-5">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-white">Join as HR/Admin now!</h1>
            </div>
            <div className="w-full shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Logo</span>
                  </label>
                  <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                     {...register("password", {
                      required: true,
                      minLength: 8,
                      maxLength: 16,
                      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
                    })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                   {errors.password?.type === "required" && (
                    <p role="alert">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p role="alert">At least 8 character is required</p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p role="alert">Maximum 16 characters are allowed</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p role="alert">
                      {" "}
                      at least one capital letter, one number, and one special
                      character is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    {...register("dateofbirth")}
                    type="date"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select a package</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" {...register("package")}>
                  <option disabled selected>Select a Package</option>
        <option value="basic">5 Members for $5
</option>
        <option value="standard">10 Members for $8</option>
        <option value="pro">20 Members for $15
</option>
      </select>
                </div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUpAdmin;